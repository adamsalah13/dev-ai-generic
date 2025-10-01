# AI-Driven Testing Guide

## 🎯 Goal

Bridge the updated ShopFlow testing strategy with AI-assisted tooling so QA engineers and developers can quickly generate comprehensive coverage.

## 🧪 Testing Pyramid

Refer to the detailed [testing strategy](./testing/testing-strategy.md) and use AI to accelerate:

- **Unit tests** – generate happy-path and edge-case coverage with Vitest/Jest.
- **Integration tests** – wire Supertest and database fixtures for API layers.
- **End-to-end tests** – script Playwright/Cypress journeys across the new checkout, profile, and admin pages.
- **Performance & security** – prototype k6, Artillery, and OWASP ZAP suites with prompt engineering.

## 🤖 Prompt Templates

```text
Act as a QA lead. Using docs/testing/testing-strategy.md and the refreshed frontend routes, propose an automated test suite that covers:
- Checkout multi-step flows (including failure paths)
- Profile settings updates and saved lists
- Admin product moderation workflows
Include tooling, data management, and CI integration steps.
```

```text
You are a reliability engineer. Review docs/deployment/azure-deployment.md and generate smoke tests that run post-deployment, verifying API health endpoints, database connectivity, and CDN asset delivery.
```

## 🧰 Toolchain

- Testing frameworks defined in the [QA exercise](../personas/qa/exercise-1-testing-strategy.md).
- CI implementation guidance from the [DevOps exercise](../personas/devops/exercise-1-ci-cd-pipeline.md).
- Prompting tips in the [prompt engineering guide](./prompting-guide.md).

## 📈 Reporting

- Publish coverage dashboards and flaky-test reports as CI artifacts.
- Feed results into observability dashboards described in the DevOps exercise.
- Document test data plans to stay compliant with data governance guidelines.

---

Combine this guide with the persona exercises to keep AI-generated tests aligned with ShopFlow's modernised architecture and documentation.
