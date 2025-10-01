# Prompt Engineering Guide

## 🎯 Goal

Help every persona craft prompts that take advantage of the new ShopFlow pages, deployment guides, and testing strategy.

## 📝 Prompt Structure

1. **Context** – identify the component or document (e.g., "checkout page", "Azure deployment playbook").
2. **Objective** – state the desired output (code, test plan, runbook, diagram).
3. **Constraints** – mention tooling, performance, or compliance requirements.
4. **Reference links** – include paths such as `docs/deployment/azure-deployment.md` or `docs/testing/testing-strategy.md`.

## 🧠 Sample Prompts

```text
Act as a senior full-stack engineer. Using the updated ShopFlow frontend (checkout, profile, admin pages) and the Azure deployment playbook, draft a GitHub Actions workflow that:
- Runs linting, type checks, and Playwright tests
- Builds and signs Docker images
- Deploys to staging App Service, runs smoke tests, and waits for manual approval to production
- References rollback procedures from docs/deployment/azure-deployment.md
```

```text
You are a QA architect. Read docs/testing/testing-strategy.md and craft an automation plan that covers:
- Checkout happy paths and failure cases
- Profile preferences updates
- Admin dashboard moderation flows
Provide coverage matrices and link them to CI pipelines.
```

## 🔄 Iteration Pattern

- Start with a broad prompt, inspect the output, then drill down into specific files.
- Ask the agent to cite the guides it used; verify links are up to date.
- Save reusable prompts in `templates/` so the team can collaborate.

## 📚 Supporting Guides

- [GitHub Copilot guide](./github-copilot-guide.md)
- [Cursor AI guide](./cursor-ai-guide.md)
- [Web development guide](./web-development-guide.md)
- [API development guide](./api-development-guide.md)
- [Testing strategy](./testing/testing-strategy.md)

---

Strong prompts keep AI-generated changes aligned with the refreshed training materials—mix declarative goals with concrete references for best results.
