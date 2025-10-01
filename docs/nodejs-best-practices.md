# Node.js Best Practices for ShopFlow

## 🚀 Runtime Overview

The ShopFlow backend uses Node.js with TypeScript, Express, and MongoDB. Follow these practices when extending the services or completing developer labs.

## 🧱 Project Structure

- Keep service boundaries clear (`backend/api-gateway`, `backend/services/*`).
- Share DTOs and validation schemas through the `backend/shared/` package.
- Align API responses with the contracts in the [API development guide](./api-development-guide.md).

## 🔐 Security & Reliability

- Validate every request with JOI/Zod and sanitize user input.
- Enforce authentication and authorisation middleware for protected routes.
- Store secrets in environment variables or Azure Key Vault; never commit `.env` files.
- Reuse the logging and error-handling middleware provided in the gateway skeleton.

## ⚙️ Performance

- Add indexes in MongoDB according to the [database design guide](./database-design-guide.md).
- Implement caching with Redis for catalog and profile endpoints.
- Apply back-pressure controls (rate limiting, circuit breakers) around external APIs.

## 🧪 Testing

- Mirror the [testing strategy](./testing/testing-strategy.md) test pyramid: unit → integration → e2e.
- Use Vitest/Jest for unit tests, Supertest for HTTP endpoints, and Playwright for journeys.
- Register new test suites in `.github/workflows/ci.yml` so they run automatically.

## 📦 Deployment

- Containerize services with the conventions in the [Docker deployment playbook](./deployment/docker-deployment.md).
- Use environment-specific configuration files and avoid hard-coded URLs.
- Inspect production readiness with health checks that integrate into the Azure workflows.

---

Keep this guide nearby when implementing new API features so your contributions align with the refreshed documentation, deployment playbooks, and testing guardrails.
