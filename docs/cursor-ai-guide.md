# Cursor AI Workflows Guide

## 🎯 Purpose

This guide complements the [GitHub Copilot guide](./github-copilot-guide.md) and explains how to use multi-agent tooling such as Cursor AI, Copilot Chat, and the built-in workspace models together. It also highlights where to reference the updated deployment and testing playbooks when driving automations.

## 🤖 When to Reach for Cursor

- **Architecture exploration** – co-design system diagrams using the prompts in `docs/pipeline-architecture.md` once generated.
- **Large refactors** – use Cursor's multi-file editing to propagate API or data-model changes surfaced in the [database design guide](./database-design-guide.md).
- **Full-stack scaffolding** – pair Cursor with the [sample app frontend route overview](../sample-app/README.md#-frontend-route-overview) to stitch UI, API, and infrastructure changes end to end.
- **Documentation refreshes** – automate updates across persona exercises after completing new labs.

## 🧠 Prompt Patterns

```text
Act as a senior developer. The ShopFlow repository now includes:
- Completed React pages for catalog, product detail, checkout, profile, and admin dashboards
- Deployment playbooks in docs/deployment/ for Azure App Service and Docker Compose
- A testing strategy in docs/testing/testing-strategy.md

Help me generate:
1. Infrastructure diagrams that align with the Azure playbook
2. API contract updates for the new frontend pages
3. Test automation plans that follow the testing strategy
4. Documentation updates for the developer and QA personas
```

### Follow-up Prompts

- "Draft a CI/CD workflow that reuses the scripts from `.github/workflows/ci.yml` but adds security scans recommended in the Azure playbook."
- "Cross-check the checkout page UI with the API spec and list missing endpoints or validation rules."
- "Produce a QA test matrix that covers the new profile and admin routes, citing the testing strategy guide."

## 📚 Reference Stack

- [Azure deployment playbook](./deployment/azure-deployment.md)
- [Docker deployment playbook](./deployment/docker-deployment.md)
- [Testing strategy](./testing/testing-strategy.md)
- [Web development guide](./web-development-guide.md)
- [API development guide](./api-development-guide.md)

## ✅ Tips for Effective Sessions

1. **Ground the agent** with links to the relevant guides above before asking for code.
2. **Iterate in phases**: design → stub → implement → test → document.
3. **Validate outputs** against the testing strategy and deployment playbooks.
4. **Commit frequently** and capture AI-generated context in PR descriptions.

---

Cursor AI shines when it is supplied with clear context and follow-up corrections. Use it alongside Copilot to accelerate end-to-end changes across ShopFlow's modernized documentation and routes.
