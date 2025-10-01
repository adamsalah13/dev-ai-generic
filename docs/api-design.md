# API Design Guidelines

## 🧭 Philosophy

ShopFlow follows a pragmatic REST style with predictable resource naming, consistent error handling, and alignment with the React frontend routes.

## 🧱 Resource Modelling

- Mirror the key pages: catalog (`/products`), product detail (`/products/:id`), checkout (`/checkout`), profile (`/account`), and admin (`/admin`).
- Provide pagination, filtering, and sorting parameters consistent with the Products page UI.
- Use `/v1/` prefixing and organise controllers by bounded context.

## 🔁 Request & Response Patterns

- Standardise success payloads as `{ data, meta }` and errors as `{ error: { code, message, details } }`.
- Document edge cases and frontend fallbacks in the [API development guide](./api-development-guide.md).
- Support idempotency for checkout and order endpoints.

## 🔐 Security

- Apply the practices outlined in [API security guidelines](./api-security.md).
- Scope admin endpoints separately and enforce RBAC.
- Mask PII and PCI fields in logs.

## 🧪 Testing & Documentation

- Generate OpenAPI specs and publish them alongside `docs/api-development-guide.md`.
- Align automated tests with the [testing strategy](./testing/testing-strategy.md).
- Use contract tests to keep frontend and backend in sync after page updates.

---

Review this guideline before introducing new endpoints; it keeps the API layer consistent with the updated ShopFlow experience and deployment processes.
