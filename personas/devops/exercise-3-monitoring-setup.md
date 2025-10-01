# Exercise 3: Monitoring & Observability Setup

## 🎯 Objective

Design and implement a monitoring stack for ShopFlow that captures health signals, business KPIs, and alerts the team when service levels degrade.

## 📋 Scenario

The ShopFlow beta launch is approaching. Leadership wants proactive insight into uptime, performance, and key commerce flows (browse → cart → checkout). You will extend the IaC foundation to deploy monitoring resources, dashboards, and alerting workflows.

## 🛠️ Deliverables

1. **Monitoring Architecture**
   - Diagram showing data sources, ingestion, storage, and visualization.
   - Description of chosen tooling (Azure Monitor, Grafana, Datadog, etc.).
2. **Instrumentation Plan**
   - Metrics catalogue (technical + business).
   - Log schema and retention policy.
   - Distributed tracing plan (if applicable).
3. **Dashboards & Alerts**
   - Dashboard JSON or definitions checked into `observability/dashboards`.
   - Alert policies with thresholds, severity, and routing.
   - Synthetic tests for homepage, product detail, and checkout flows.
4. **Runbooks & On-call Guide**
   - Minimum of two runbooks for Sev1/Sev2 incidents.
   - On-call rotation and escalation policy documented.

## 🤖 AI Workflow

1. Start with the [Monitoring Template](../../templates/devops/monitoring-template.md) to gather context.
2. Prompt AI for metrics/alert recommendations per component (frontend, API, database).
3. Generate infrastructure code or scripts to provision monitoring resources.
4. Ask AI to draft dashboards and alert YAML/JSON, then review manually.
5. Use AI to create concise runbooks with troubleshooting steps and rollback guidance.

## ✅ Acceptance Criteria

- [ ] `observability/` directory contains architecture notes, dashboards, alerts, and runbooks.
- [ ] Monitoring solution integrates with existing infrastructure (or mocks for local dev).
- [ ] Dashboards include executive overview and on-call deep dive views.
- [ ] Alert routing matches escalation policy and avoids alert fatigue.
- [ ] Synthetic checks cover login, add-to-cart, and checkout flows.
- [ ] Documentation includes maintenance tips and testing strategy.

## 🔍 Stretch Goals

- Implement SLO calculations with error budgets and burn-rate alerts.
- Add anomaly detection or AI Ops integration.
- Automate dashboard provisioning via CI/CD.

## 📚 Reference Materials

- [Monitoring Template](../../templates/devops/monitoring-template.md)
- [Testing Strategy Guide](../../docs/testing/testing-strategy.md)
- [API Development Guide](../../docs/api-development-guide.md)

---

**Timebox:** 3–4 hours. Coordinate with QA and Support to align alert procedures.
