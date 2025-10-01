# Exercise 2: Automated Testing Suite

## 🎯 Objective

Leverage AI to accelerate the creation of an automated testing suite covering ShopFlow's critical journeys (catalog browsing, cart, checkout).

## 📋 Scenario

The development team is integrating the frontend with mock APIs. Your task is to bootstrap automated tests using Cypress/Playwright for UI, Jest/Vitest for unit tests, and Supertest for API smoke tests. AI should help draft tests, fixtures, and reusable utilities.

## 🛠️ Deliverables

1. **Test Plan** (`tests/README.md`)
   - Scope, tools, environments, and responsibilities.
   - Mapping of features to automated vs. manual coverage.
2. **UI Automation**
   - Cypress or Playwright project under `tests/e2e/` with suites for homepage, products, checkout, and admin dashboard access control.
   - Use data-test attributes or selectors generated with AI suggestions.
3. **API Tests**
   - Supertest or REST Client scripts hitting mock API endpoints (can use the backend stubs or mocks).
   - Assertions for status codes, payloads, and error handling.
4. **Unit/Integration Tests**
   - Vitest/Jest specs for reusable components (e.g., `ProductCard`, pagination logic).
   - Snapshot or accessibility tests where appropriate.
5. **Reporting**
   - HTML/JSON test reports stored under `tests/reports/`.
   - GitHub Actions workflow (optional) to run the suite on pull requests.

## 🤖 AI Workflow

1. Use the [Test Strategy Template](../../templates/qa/test-strategy-template.md) to outline scope.
2. Ask AI to scaffold Cypress/Playwright config and sample tests.
3. Generate fixture data (products, users, orders) via prompts.
4. Use AI to suggest assertions, edge cases, and negative tests.
5. Request instructions for integrating the suite into CI/CD.

## ✅ Acceptance Criteria

- [ ] Tests are runnable locally with clear setup instructions.
- [ ] UI suite covers at least three happy paths and two failure scenarios.
- [ ] API tests verify success + error responses for catalog endpoints.
- [ ] Unit tests cover critical components and utilities with >70% statement coverage.
- [ ] Test reports generated automatically after suite execution.
- [ ] Documentation includes maintenance guidance and flake triage process.

## 🔍 Stretch Goals

- Add visual regression testing with Percy or Playwright snapshots.
- Integrate accessibility checks (axe, pa11y).
- Configure test data reset or seeding scripts.

## 📚 Reference Materials

- [Testing Strategy Guide](../../docs/testing/testing-strategy.md)
- [API Development Guide](../../docs/api-development-guide.md)
- [Web Development Guide](../../docs/web-development-guide.md)

---

**Timebox:** 4 hours. Pair with developers to stabilise selectors and mock data.
