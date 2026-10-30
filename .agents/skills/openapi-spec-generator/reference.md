# OpenAPI generator reference (Ianu Mind)

## File locations

| File | Purpose |
|------|---------|
| `specs/api/openapi.yml` | Root document — info, servers, security, `$ref` paths |
| `specs/api/paths/<resource>.yml` | Definitions per route |
| `specs/api/schemas/<name>.yml` | Schemi riusabili |
| `specs/api/schemas/error-envelope.yml` | Errori / envelope condivisi |

## Naming conventions

| Concept | Convention | Example |
|---------|-----------|---------|
| operationId | camelCase | `listPatients`, `createSession` |
| Tag | coerente con `openapi.yml` | `patients`, `sessions` |
| Path parameter | spesso snake_case negli YAML già presenti | `patient_id`, `session_id` |

## Authentication

```yaml
# In openapi.yml components:
securitySchemes:
  bearerAuth:
    type: http
    scheme: bearer
    bearerFormat: JWT

# Per operation protette:
security:
  - bearerAuth: []
```

## Response status codes

| Code | When |
|------|------|
| 200 | GET success, PATCH success con body |
| 201 | POST success |
| 204 | DELETE senza body (se usato) |
| 400 | Richiesta malformata |
| 401 | Token assente o non valido |
| 403 | Autenticato ma non autorizzato |
| 404 | Risorsa assente |
| 422 | Validazione input fallita |
| 500 | Errore interno |

## Validation (Python)

Dipendenza: `openapi-spec-validator` (vedi `requirements.txt`).

```bash
python -m openapi_spec_validator specs/api/openapi.yml
```

Integrazione CI: stesso comando in una job futura sotto `.github/workflows/`.

## Pagination and filters

Se un endpoint espone paginazione o filtri, documentare query parameters in OpenAPI come negli altri path già presenti in `specs/api/paths/`.
