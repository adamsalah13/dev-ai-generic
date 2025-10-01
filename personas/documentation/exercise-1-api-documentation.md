# Exercise 1: API Documentation Creation

## 🎯 Objective

Use AI tools to produce polished, developer-friendly documentation for the ShopFlow Product API. The deliverable should cover authentication, endpoints, request/response schemas, and error handling.

## 📋 Scenario

The backend team just delivered the first version of the Product API. You are responsible for publishing documentation that developers can consume immediately. Mock responses are acceptable while the live API stabilises.

## 🛠️ Deliverables

1. `docs/api/product-api.md` (or similar) containing:
   - Overview, base URL, authentication method.
   - CRUD endpoints for products, categories, and search.
   - Request/response samples and error codes.
2. OpenAPI specification (`docs/api/product-api.yaml`) generated or validated with AI.
3. Quick-start section showing how to authenticate and make the first request.
4. Changelog noting initial publication.

## 🤖 AI Workflow

1. Use the [API Documentation Template](../../templates/documentation/api-docs-template.md) to structure your prompts.
2. Generate endpoint tables and JSON samples with GitHub Copilot or Cursor.
3. Ask AI to draft an OpenAPI spec, then validate using tools like `swagger-cli` or `speccy`.
4. Create Mermaid diagrams for request lifecycle or architecture (optional but encouraged).

## ✅ Acceptance Criteria

- [ ] Markdown guide checked into `docs/api/`.
- [ ] OpenAPI spec passes lint/validation.
- [ ] Examples use realistic data and cover edge cases (errors, pagination, filtering).
- [ ] Authentication steps verified with backend engineers.
- [ ] Documentation includes feedback or support channel.

## 🔍 Stretch Goals

- Embed Postman collection or Insomnia workspace link.
- Generate SDK snippets (JavaScript, Python) with AI assistance.
- Add versioning strategy and deprecation policy.

## 📚 Reference Materials

- [API Development Guide](../../docs/api-development-guide.md)
- [API Security Guide](../../docs/api-security.md)
- [MongoDB Guide](../../docs/mongodb-guide.md)

---

**Timebox:** 2–3 hours. Pair with the developer persona to confirm contract details.
