---
name: surveys-api-feature
overview: "Implementa 5 endpoint per questionari clinici con pattern identico a summaries/transcriptions: route sottili → adapter `IanuaSurveysAdapter` sopra `ianuacare.Pipeline.run_crud` → Celery task async per scoring/risk assessment. Template JSON gestiti da un registry backend (mixed mode); il `content` JSONB di `core.surveys` tiene `template_id`, `template_version`, `status`, `responses`, `score`, `risk_level`."
todos:
  - id: slice1-foundation
    content: "Slice 1 — Foundation: template registry (app/surveys/templates/ con phq9.v1.json e gad7.v1.json) + loader get_template/list_templates + scorer registry (app/surveys/scorers/) con phq9 e gad7 + unit test scorers. Niente HTTP, niente DB."
    status: completed
  - id: slice2-adapter
    content: "Slice 2 — Adapter: IanuaSurveysAdapter sopra ianuacare Pipeline.run_crud per core.surveys (create/read_one/read_many/update con soft-delete filter) + unit test adapter con Pipeline mockato."
    status: completed
  - id: slice3-service-task
    content: "Slice 3 — Service + Celery task: IanuaSurveyService.start_survey (crea record content.status='pending', send_task) + app/tasks/survey.py::generate_survey_score (carica survey, risolve scorer dal registry, update content con score/risk_level/status='ready') + routing queue 'survey' in app/celery.py + wiring in create_app + test task."
    status: completed
  - id: slice4-post-list
    content: "Slice 4 — Endpoints POST e GET list: POST /patients/{id}/surveys (202) e GET /patients/{id}/surveys?type=&page=&page_size= + registrazione blueprint + deps accessor + test API happy+edge+error + OpenAPI (paths + schemas) + validator."
    status: completed
  - id: slice5-detail-patch
    content: "Slice 5 — Endpoints detail e PATCH: GET /surveys/{id} e PATCH /surveys/{id} (re-dispatch task se responses cambia) + test API + OpenAPI."
    status: completed
  - id: slice6-trend
    content: "Slice 6 — Endpoint trend: GET /patients/{id}/surveys/trend?type= (aggregazione ordinata per created_at, estrae score+risk_level da content) + test API + OpenAPI."
    status: completed
  - id: slice7-docs
    content: "Slice 7 — Documentation: aggiorna specs/db/feature-schema-tracking.md con forma del JSONB content, specs/api/api-endpoints-list.md, README sezione 'Surveys' (env var se servono, esempio cURL, elenco template disponibili)."
    status: completed
isProject: false
---

## Scope degli endpoint

Tutti sotto `/api/v1`, Bearer Cognito obbligatoria, envelope standard `{data, errors, meta}` via `ok_json` ([app/api/v1/util.py](app/api/v1/util.py)).

- `POST /patients/{patient_id}/surveys` — crea survey `pending`, dispatcha Celery per scoring (risk assessment integrato). Risposta `202`.
- `GET /patients/{patient_id}/surveys?type=&page=&page_size=` — storico con filtro per tipo.
- `GET /surveys/{survey_id}` — dettaglio singolo.
- `PATCH /surveys/{survey_id}` — aggiorna `responses` (o altro campo `content.*`); ri-dispatcha scoring se `responses` cambia.
- `GET /patients/{patient_id}/surveys/trend?type=` — serie `[{date, score, risk_level}]` ordinata per `created_at`.

## Decisioni di design

- **Template (mixed)**: registry Python in `app/surveys/templates/` con file `.json` SurveyJS-compatibili (es. `phq9.v1.json`, `gad7.v1.json`); loader `app/surveys/templates/__init__.py` con `get_template(type, version)` + `list_templates()`. La POST richiede `type` e opzionalmente `template_version` (default: latest).
- **Scoring async (Celery)**: nuovo task `app.tasks.survey.generate_survey_score` con routing queue `survey` in [app/celery.py](app/celery.py); import in `create_app` via `__import__("app.tasks.survey")` come per summary/transcription.
- **Scorer registry**: `app/surveys/scorers/` — uno scorer per tipo (`phq9.py`, `gad7.py`, `risk_assessment.py`), firma `score(responses: dict, template: dict) -> {score: int, risk_level: str, breakdown: dict}`. Il task seleziona lo scorer in base a `content.template_id`.
- **DB senza migrazione**: `core.surveys` ha già `content JSONB` ([specs/db/schema.sql:114](specs/db/schema.sql)). Tutto vive in `content`:

```json
{
  "template_id": "phq9",
  "template_version": "1",
  "status": "pending|processing|ready|failed",
  "responses": { "q1": 2, "q2": 1, ... },
  "score": 14,
  "risk_level": "moderate",
  "breakdown": { "depression": 14 },
  "error": null
}
```

Aggiornamento di `specs/db/feature-schema-tracking.md` per documentare questa convenzione (no migrazione).

- **Risk assessment integrato**: non è un endpoint separato. Lo scorer `risk_assessment` è un tipo come gli altri; quando lo scorer di un qualsiasi tipo produce `risk_level`, questo torna nel payload — integrato naturalmente.

## Architettura (vista flusso POST)

```mermaid
flowchart LR
    Client -->|POST| Route[app/api/v1/surveys.py]
    Route --> Svc[IanuaSurveyService.start_survey]
    Svc --> Adapt[IanuaSurveysAdapter.create_survey]
    Adapt --> PG[(core.surveys)]
    Svc --> Celery[send_task generate_survey_score]
    Celery --> Worker[app/tasks/survey.py]
    Worker --> Scorer[app/surveys/scorers registry]
    Worker --> Adapt2[IanuaSurveysAdapter.update_survey_content]
    Adapt2 --> PG
```



## File da creare

- `app/api/v1/surveys.py` (route; registrare in `app/api/v1/__init__.py`)
- `app/integrations/ianua_surveys.py` (`IanuaSurveysAdapter` + `IanuaSurveyService`; pattern unito per ridurre boilerplate)
- `app/surveys/__init__.py`, `app/surveys/templates/__init__.py`, `app/surveys/templates/phq9.v1.json`, `app/surveys/templates/gad7.v1.json`
- `app/surveys/scorers/__init__.py` (registry), `app/surveys/scorers/phq9.py`, `app/surveys/scorers/gad7.py`
- `app/tasks/survey.py` (task Celery)
- `specs/api/paths/surveys.yml`, `specs/api/paths/patient-surveys.yml`, `specs/api/paths/patient-surveys-trend.yml`, `specs/api/schemas/survey.yml`, `specs/api/schemas/survey-response.yml`, `specs/api/schemas/survey-list-response.yml`, `specs/api/schemas/survey-trend-response.yml`
- Test: `tests/test_surveys_api.py`, `tests/test_ianua_surveys_adapter.py`, `tests/test_celery_tasks.py` (estendi con casi survey), `tests/test_survey_scorers.py`

## File da modificare

- `app/api/v1/__init__.py` (import `surveys`)
- `app/api/v1/deps.py` (accessor `ianua_surveys()`)
- `app/__init__.py` (init `IanuaSurveysAdapter`/`IanuaSurveyService` e `__import__("app.tasks.survey")`)
- `app/celery.py` (`task_routes` per `app.tasks.survey.*` → `survey`)
- `specs/api/openapi.yml` (`$ref` ai nuovi path)
- `specs/api/api-endpoints-list.md` (marca gli endpoint come implementati)
- `specs/db/feature-schema-tracking.md` (documenta forma del JSONB `content`)

## Verifica finale

Al termine, esegui:

- `PYTHONPATH=. pytest -q` (tutti i test verdi, coverage ≥80% sui file nuovi)
- `python -m openapi_spec_validator specs/api/openapi.yml`
- `ruff check app/ tests/` e `mypy --strict app/` (se configurati; altrimenti segnala il gap)

