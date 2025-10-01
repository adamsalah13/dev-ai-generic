# DevOps Exercise 1: CI/CD Pipeline Setup

## 🎯 Exercise Objectives

By the end of this lab you will be able to:

- Design and document a multi-stage CI/CD pipeline for the ShopFlow platform.
- Automate quality, security, and deployment gates with AI-assisted workflows.
- Provision cloud-ready infrastructure definitions with container orchestration.
- Instrument monitoring, alerting, and incident response for production workloads.
- Embed compliance, security, and rollback safeguards into delivery pipelines.

## 📋 Background

ShopFlow is the course e-commerce application (React + Node.js + MongoDB + Redis) that now ships with a complete frontend route map, deployment playbooks, and testing strategy. As the DevOps engineer you are responsible for turning these assets into a reliable build and release system that serves development, staging, and production environments.

## 📚 Reference Materials

- [Azure deployment playbook](../../docs/deployment/azure-deployment.md)
- [Docker deployment playbook](../../docs/deployment/docker-deployment.md)
- [Testing strategy](../../docs/testing/testing-strategy.md)
- [Sample application README](../../sample-app/README.md)
- [GitHub Copilot prompting patterns](../../docs/github-copilot-guide.md)

## 🧠 AI-Assisted Tasks

### Task 1: Pipeline Architecture (Design First)

#### AI Prompt Template (Task 1)

```text
Act as an expert DevOps architect. Design a complete CI/CD pipeline for the ShopFlow application with the following stack:

Frontend: React (Vite, TypeScript)
Backend: Node.js (Express + TypeScript)
Data: MongoDB, Redis
Container: Docker images published to GHCR
Deployments: Azure App Service (frontend + API) and Azure Container Apps for background jobs

Requirements:
- Multi-environment (dev, staging, production) with approval gates
- Automated linting, type checking, unit, integration, and e2e tests
- Security scanning (SAST, dependency, container image) and license compliance
- Docker image build, scan, and signature verification
- Infrastructure as Code validation (Terraform and Kubernetes manifests)
- Zero-downtime rollout strategy with automated rollback
- Observability hooks (logs, metrics, traces)

Deliver:
1. Mermaid diagram of the pipeline stages and artifact flow
2. Detailed step-by-step workflow description
3. Tool recommendations with justification and cost notes
4. Security, compliance, and governance considerations
5. Monitoring and alerting strategy integrated with deployments
```

#### Your Task (Task 1)

1. Generate the pipeline architecture using Copilot Chat or another AI assistant.
2. Tailor the output to align with ShopFlow naming conventions and environments.
3. Convert the plan into `docs/pipeline-architecture.md` and share with the team.

### Task 2: GitHub Actions Workflows

#### AI Prompt Template (Task 2)

```text
Create GitHub Actions workflows for ShopFlow with the following deliverables:

1. `ci.yml` (pull_request to main)
   - Node.js matrix (18.x, 20.x)
   - Install frontend and backend dependencies with caching
   - Run linting, type checking, unit, and integration tests
   - Execute Playwright or Cypress e2e suite against the Vite dev server
   - Run npm audit, Trivy (container), and license compliance checks
   - Build frontend and backend artifacts
   - Publish coverage summary as a job artifact

2. `cd.yml` (push to main)
   - Build and push Docker images to GHCR with semantic tags
   - Scan images with Trivy and sign with cosign
   - Deploy to staging App Service and run smoke tests
   - Require manual approval for production promotion
   - Deploy production after approval with health checks and rollback guardrails
   - Notify Slack/Teams channels on success or failure

3. `feature-deploy.yml` (push to feature/*)
   - Spin up ephemeral environments using Azure Container Apps
   - Run targeted tests and tear down on completion

Include reusable composite actions for installation steps, environment secrets, and caching.
```

#### Your Task (Task 2)

1. Use the prompt to scaffold the workflows under `.github/workflows/`.
2. Ensure secrets and environments (`dev`, `staging`, `production`) are referenced consistently.
3. Document workflow stages in `docs/workflow-reference.md` for future learners.

### Task 3: Infrastructure as Code

#### AI Prompt Template (Task 3)

```text
Generate Infrastructure-as-Code assets for ShopFlow:

- Docker Compose files for local (developer) and production parity setups
- Kubernetes manifests (Deployments, Services, Ingress, HPA, ConfigMaps, Secrets) for the API and background workers
- Terraform modules targeting Azure resources:
  * Resource group, virtual network, subnets
  * Azure App Service plan + Web Apps
  * Azure Cosmos DB for Mongo API
  * Azure Cache for Redis
  * Azure Container Registry
  * Application Insights + Log Analytics workspace
  * Key Vault for secrets

Provide separate variable sets for dev/staging/prod, and include scripts for running terraform plan/apply with approval gates. Highlight cost optimisation levers.
```

#### Your Task (Task 3)

1. Create `infrastructure/docker-compose.yml` and `docker-compose.prod.yml` aligned with the AI output.
2. Scaffold Kubernetes manifests under `infrastructure/k8s/` with environment overlays.
3. Produce Terraform modules under `infrastructure/terraform/` with environment workspaces.
4. Write `docs/infrastructure-readme.md` summarising provisioning steps.

### Task 4: Monitoring and Observability

#### AI Prompt Template (Task 4)

```text
Design a comprehensive monitoring stack for ShopFlow covering application, infrastructure, and business metrics. Include:

- Prometheus + Grafana dashboards for API latency, error rates, queue depth, cache hit ratios
- Application Insights or OpenTelemetry traces integrated with the Node.js backend
- Synthetic monitoring for the React frontend (key journeys)
- Alert rules for SLA/SLO breaches with escalation policy
- Business KPIs (checkout conversion, cart abandonment, average order value)
- Incident response runbooks with ownership and resolution steps
```

#### Your Task (Task 4)

1. Generate dashboard definitions (JSON/YAML) and store them in `monitoring/dashboards/`.
2. Capture alert policies and runbooks in `monitoring/alerts.md` and `monitoring/runbooks.md`.
3. Wire log/metric exporters into the infrastructure IaC (Terraform, Kubernetes manifests).

### Task 5: Security & Compliance Automation

#### AI Prompt Template (Task 5)

```text
Help me implement end-to-end security and compliance automation for the ShopFlow CI/CD pipeline:

- Static application security testing (SAST) and dependency scanning (npm audit, Trivy, Snyk)
- Container image signing and policy enforcement
- Infrastructure-as-Code scanning (tfsec, Checkov) and policy-as-code (Open Policy Agent)
- Dynamic application security testing (OWASP ZAP / Burp) against staging
- Compliance report generation (PCI DSS, GDPR, SOC 2 readiness)
- Automated incident response runbooks triggered by failed checks
```

#### Your Task (Task 5)

1. Integrate security scanners as dedicated jobs in the CI workflow with severity gating.
2. Configure policy-as-code checks before Terraform/Kubernetes deploy stages.
3. Produce security reports in `security/reports/` and document response procedures in `security/runbooks.md`.

## 📊 Deliverables

### 1. Architecture & Documentation

- [ ] `docs/pipeline-architecture.md`
- [ ] `docs/workflow-reference.md`
- [ ] `docs/infrastructure-readme.md`

### 2. GitHub Actions Workflows

- [ ] `.github/workflows/ci.yml`
- [ ] `.github/workflows/cd.yml`
- [ ] `.github/workflows/feature-deploy.yml`

### 3. Infrastructure as Code

- [ ] `infrastructure/docker-compose*.yml`
- [ ] `infrastructure/k8s/` manifests with overlays
- [ ] `infrastructure/terraform/` modules and environment variables

### 4. Monitoring & Security Assets

- [ ] `monitoring/dashboards/` and `monitoring/alerts.md`
- [ ] `monitoring/runbooks.md`
- [ ] `security/reports/` and `security/runbooks.md`

## 🚀 Implementation Steps

1. Fork or clone the ShopFlow repository and configure GitHub environments (`dev`, `staging`, `production`).
2. Stand up local services with `docker compose up mongodb redis` and validate the existing frontend routes.
3. Implement and test the CI workflow, iterating until lint/test/security jobs pass reliably.
4. Build Docker images locally, push to a personal registry, and validate Azure deployment using the provided playbooks.
5. Layer in Terraform/Kubernetes definitions, integrating monitoring exporters and secrets handling.
6. Run end-to-end smoke tests and document rollback strategies for each environment.

## ✅ Success Criteria

- CI runs complete within agreed SLAs (< 15 minutes for pull requests).
- High-confidence quality gates (unit/integration/e2e/security) block unsafe merges.
- Deployments are reproducible and observable across environments.
- IaC artefacts provision Azure resources aligned with security and cost guidelines.
- Monitoring and alerting provide actionable insight with documented on-call runbooks.

## 📚 Learning Resources

### Official Documentation

- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [Azure App Service deployment guidance](https://learn.microsoft.com/azure/app-service/)
- [Terraform on Azure](https://learn.microsoft.com/azure/developer/terraform/)
- [Prometheus & Grafana Getting Started](https://prometheus.io/docs/introduction/overview/)

### Course Assets

- [Azure deployment playbook](../../docs/deployment/azure-deployment.md)
- [Docker deployment playbook](../../docs/deployment/docker-deployment.md)
- [Testing strategy](../../docs/testing/testing-strategy.md)
- [Sample app frontend route overview](../../sample-app/README.md#-frontend-route-overview)

### Prompting Guides

- [GitHub Copilot guide](../../docs/github-copilot-guide.md)
- [Business Analyst exercise](../business-analyst/exercise-1-product-management.md) for upstream context
- [QA testing exercise](../qa/exercise-1-testing-strategy.md) to integrate quality gates

## 🔗 Next Steps

1. Pair with developers to align API contracts and release cadence.
2. Coordinate with QA to embed their automation suites in the CI workflow.
3. Share deployment runbooks with the documentation persona for publication.
4. Schedule a simulated incident response drill using the new monitoring stack.

---

Ready to automate ShopFlow releases with confidence? Kick off Task 1 and design the pipeline architecture! 🚀
