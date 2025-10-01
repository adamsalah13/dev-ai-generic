# Monitoring & Observability Planning Template

Use this template with your AI assistant to design monitoring, logging, and alerting for the ShopFlow platform.

## 🎯 Goal

Describe the monitoring objective clearly. Example:

- Stand up centralized logging and metrics for the ShopFlow API gateway and frontend.
- Implement synthetic checks and alerting for critical commerce journeys.

## 🧩 Inputs for the AI

- Deployment environment(s) and SLAs.
- Existing tooling (e.g., Azure Monitor, Datadog, Grafana, Elastic).
- Critical transactions to observe (checkout, login, add-to-cart).
- Error budgets, latency targets, throughput expectations.
- Compliance or retention requirements.
- On-call escalation policies.

## 🗂️ Desired Output

Ask the AI to provide:

- Target architecture diagram or description.
- Metrics to collect (business + technical).
- Log aggregation strategy and index/retention plans.
- Alert rules with thresholds, cooldowns, and routing.
- Dashboards to build (widgets, filters, drill-downs).
- Runbooks or playbooks for top incidents.

## 🤖 Prompt Starter

```text
Act as an SRE designing observability for the ShopFlow e-commerce platform.
Context:
- Stack: React frontend, Node.js API gateway, MongoDB, Redis.
- Deployments: staging + production.
- SLAs: 99.9% uptime, <500ms P95 API latency, <2s P95 page load.
- Alert routing: PagerDuty for Sev1, Teams channel for Sev2.
Deliverables:
1. Monitoring architecture overview.
2. Metrics, logs, and traces to capture (with collection tooling).
3. Alert policies (thresholds, severity, routing).
4. Dashboard outline for executives vs. engineers.
5. Weekly review checklist.
```

## ✅ Review Checklist

- [ ] Business KPIs are instrumented (GMV, conversion, active users).
- [ ] Technical metrics cover availability, latency, errors, saturation.
- [ ] Log retention aligns with compliance requirements.
- [ ] Alerts mapped to actionable runbooks.
- [ ] Noise-reduction strategies defined (alert grouping, suppression).
- [ ] Dashboards include annotations for releases/incidents.
- [ ] Synthetic tests cover the critical commerce flows.

## 🔄 Follow-up Prompts

- "Generate Terraform/Scripts to provision the proposed monitoring stack."
- "Draft an on-call handover document based on the alert matrix."
- "Suggest chaos experiments to validate the monitoring setup."

## 📦 Deliverables Folder Structure

```text
observability/
├── README.md
├── dashboards/
│   ├── exec-overview.json
│   └── sre-operations.json
├── alerts/
│   ├── api-latency.yaml
│   ├── checkout-slo.yaml
│   └── uptime-synthetics.yaml
├── runbooks/
│   ├── checkout-failures.md
│   └── database-alerts.md
└── scripts/
    └── provision-monitoring.sh
```
