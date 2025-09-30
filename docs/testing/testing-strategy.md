# Testing Strategy Guide

This guide outlines the testing strategy for the dev-ai-generic project, covering recommended practices, tooling, and workflows across unit, integration, and end-to-end testing.

## Objectives

- Ensure reliable and maintainable test coverage across frontend and backend services.
- Align testing activities with continuous integration and deployment workflows.
- Provide clear guidance for contributors on how and when to write and execute tests.

## Testing Pyramid

```text
          End-to-End (Cypress/Playwright)
               ^      ^      ^
             Integration (API, Service, DB)
                    ^   ^   ^
                  Unit Tests (Jest, Vitest)
```

- **Unit Tests**: Fast, isolated tests for components, hooks, utility functions, and backend modules. Target 70%+ coverage for critical paths.
- **Integration Tests**: Validate interactions between modules, APIs, and databases. Focus on critical business flows, authentication, and data persistence.
- **End-to-End Tests**: Validate user journeys in a production-like environment. Automate smoke test suites for core ecommerce flows (browse, search, checkout).

## Frontend Testing

### Frontend Tools

- **Jest** with **React Testing Library** for component and hook testing.
- **MSW (Mock Service Worker)** for mocking API responses during UI tests.
- **Playwright** (or Cypress) for E2E browser automation.

### Frontend Test Coverage

1. **Unit Tests**
   - Components: render states, props, edge cases.
   - Hooks: asynchronous logic, state management, side-effects.
   - Utilities: pure functions (formatters, validators).

2. **Integration Tests**
   - Pages rendering with router context.
   - API integration with mocked network requests.
   - Form interactions and validation flows.

3. **End-to-End Tests**
   - Anonymous user shopping flow (browse → add to cart → checkout).
   - Authenticated flows (login, profile update, order history).
   - Admin dashboard smoke tests (access control, CRUD operations).

### Frontend Command Examples

```bash
# Run frontend unit tests with coverage
npm run test -- --coverage

# Execute Playwright E2E suite
npx playwright test
```

## Backend Testing

### Backend Tools

- **Jest** or **Vitest** for unit and integration tests.
- **Supertest** for HTTP API assertions.
- **Prisma/Testcontainers** (or Docker Compose) for ephemeral database instances.

### Backend Test Coverage

1. **Unit Tests**
   - Controllers/services: business logic, error handling.
   - Helpers/middleware: authentication guards, formatting.

2. **Integration Tests**
   - REST endpoints with mocked or containerized databases.
   - Authentication and authorization scenarios.
   - Data migrations and seeding scripts.

3. **Contract Tests**
   - Schema and validation tests for API responses.
   - OpenAPI/Swagger validation to ensure documentation accuracy.

### Backend Command Examples

```bash
# Run backend unit & integration tests
npm run test

# Start database container for integration tests
npm run docker:db-up
```

## Continuous Integration

### Recommended Workflow

1. Run unit tests locally before pushing.
2. GitHub Actions executes unit + integration suites on every pull request.
3. Nightly job executes full E2E suite against staging environment.
4. Test reports (coverage, screenshots, videos) uploaded as build artifacts.

### Sample GitHub Actions Matrix

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Run unit tests
        run: npm run test -- --coverage
```

## Test Data & Fixtures

- Store reusable fixtures under `tests/fixtures/`.
- Use Factory functions (e.g., `@faker-js/faker`) to generate dynamic data.
- Reset application state between tests (database truncation, cache flush).
- Avoid using production data in tests.

## Quality Gates

1. **Static Analysis**: ESLint, TypeScript, Prettier must pass.
2. **Unit Test Coverage**: Minimum 80% lines for critical modules.
3. **Integration Tests**: Critical API flows must pass before merge.
4. **E2E Smoke Suite**: Must pass before production deployment.

## Reporting & Observability

- Publish coverage reports (Codecov, Coveralls) for visibility.
- Export Playwright traces/screenshots on failure.
- Alert on test regressions using GitHub Checks or Slack notifications.
- Review flaky tests weekly and quarantine if necessary.

## Maintenance Tips

- Refactor tests alongside production code changes.
- Keep test utilities DRY and well-documented.
- Review dependency updates for testing libraries regularly.
- Schedule periodic cleanup of mock data and fixtures.

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/docs/intro)
- [GitHub Actions](https://docs.github.com/en/actions)
