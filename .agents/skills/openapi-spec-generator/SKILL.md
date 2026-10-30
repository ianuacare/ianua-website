---
name: openapi-spec-generator
description: >-
  Generate and validate OpenAPI 3.1 specifications for Ianua Mind Flask API endpoints.
  Use when creating new routes, updating request/response shapes, documenting the API,
  or when asked to write an OpenAPI spec, Swagger spec, or API documentation.
  Every endpoint in app/api/v1/ must have a spec under specs/api/.
---

# OpenAPI Spec Generator (Flask)

Generates and maintains OpenAPI 3.1 specs aligned with le route Flask reali.

## Workflow

### Step 1 — Scan the endpoint
Read:
- Implementazione: `app/api/v1/<module>.py` (funzioni di route e registrazione blueprint in `app/api/v1/__init__.py`)
- Handler errori / serializzazione JSON coerente con `app/errors.py`
- Test di contratto o esempi: `tests/test_<area>_api.py`

### Step 2 — Generate or update path spec

Create or update `specs/api/paths/<name>.yml` (o il file già referenziato da `openapi.yml`).

Key requirements:
- `operationId` in camelCase (`listPatients`, `getSessionById`)
- Parametri path/query/body con tipi, obbligatorietà, descrizioni
- Response codes: 200/201, 401, 422, 500; 404 per risorse per id dove applicabile
- Almeno un esempio per le risposte principali
- `security: [ bearerAuth: [] ]` sulle route protette

### Step 3 — Generate/update schemas

Per ogni forma JSON restituita o accettata, usare o aggiungere schemi in `specs/api/schemas/*.yml` e `$ref` dai path.

**Python / JSON → OpenAPI (linee guida)**:

| Tipo in app | OpenAPI |
|-------------|---------|
| `str` | `string` |
| `int` | `integer` (es. `format: int64` per id) |
| `float` | `number` |
| `bool` | `boolean` |
| `datetime` ISO | `string`, `format: date-time` |
| `None` ammesso | `nullable: true` sul campo |
| `list[T]` | `array` + `items` |
| `dict` strutturato | `object` + `properties` |

### Step 4 — Register in root document

Aggiorna `specs/api/openapi.yml`: sezione `paths:` con `$ref` al file path, e `tags:` se serve una nuova etichetta.

### Step 5 — Validate

```bash
python -m openapi_spec_validator specs/api/openapi.yml
```

(`openapi-spec-validator` è in `requirements.txt`.)

## Authentication pattern

Endpoint protetti da JWT Cognito:

```yaml
security:
  - bearerAuth: []
```

Lo scheme `bearerAuth` è definito in `specs/api/openapi.yml` sotto `components.securitySchemes`.

## Error responses

Riutilizzare gli schema condivisi (es. `error-envelope.yml`) con `$ref` come da convenzione del repo.

## Reference files

- Root: [specs/api/openapi.yml](../../../specs/api/openapi.yml)
- Reference: [reference.md](reference.md)
