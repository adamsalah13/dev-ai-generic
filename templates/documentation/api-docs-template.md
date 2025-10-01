# API Documentation Template

Use this structure to document ShopFlow APIs with AI assistance.

## 1. Overview

- **Service Name:**
- **Primary Owner:**
- **Last Updated:**
- **Summary:** Concise description of the service and its purpose.
- **Base URL:** e.g., `https://api.shopflow.com/v1`

## 2. Authentication

- Method (e.g., JWT Bearer token, API key).
- Required headers with examples.
- Token refresh or rotation policy.

## 3. Endpoints

Document each endpoint using the following checklist:

### 3.x `<HTTP VERB> /resource`

- **Description:**
- **Use Cases:** Bullet list.
- **Request Headers:** Table with `Header`, `Required`, `Description`.
- **Query Parameters:** Table (if applicable).
- **Path Parameters:** Table (if applicable).
- **Request Body Schema:** JSON schema or table.
- **Sample Request:**

```jsonc
{
  "example": "payload"
}
```

- **Success Response (200/201):**
  - Body schema and example.
- **Error Responses:**
  - Codes, reasons, remediation tips.
- **Rate Limits:** Requests per minute/hour.
- **Related Events / Webhooks:** (optional)

## 4. Data Models

Provide entity definitions and relationships. Include validation rules, defaults, and indexing notes.

## 5. Workflows & Sequence Diagrams

Highlight multi-step flows such as checkout, returns, or authentication. Use Mermaid or PlantUML for visuals.

## 6. Testing & Mocking

- Contract tests or Postman collections.
- Sandbox/base URL differences.
- Mock server instructions.

## 7. Change Log

Track major updates, breaking changes, API version bumps, and deprecations.

## 8. References

- Related guides (security, error handling, SDK docs).
- Contact channels for support.
