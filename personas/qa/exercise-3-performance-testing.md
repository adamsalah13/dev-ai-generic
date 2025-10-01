# Exercise 3: Performance & Resilience Testing

## 🎯 Objective

Design and execute a performance testing strategy for ShopFlow using AI to accelerate script generation, scenario design, and result analysis.

## 📋 Scenario

Stakeholders need assurance that ShopFlow can handle a seasonal traffic spike (10x normal load) without degrading user experience. You will use k6, JMeter, or Locust to script load tests, plus AI to interpret findings and recommend optimisations.

## 🛠️ Deliverables

1. **Performance Test Plan** (`tests/performance/PLAN.md`)
   - Objectives, KPIs (latency, throughput, error rates), and pass/fail thresholds.
   - Environment setup and test data requirements.
2. **Load Scripts**
   - Scripts for ramp-up, sustained load, and stress scenarios.
   - Parameterised configuration (VU count, duration, target URLs) driven by env variables.
3. **Resilience Checks**
   - Chaos or failure-injection ideas (e.g., kill Redis, degrade API latency) documented.
   - Optional: scripts leveraging tools like Azure Chaos Studio or Gremlin.
4. **Reporting & Analysis**
   - Raw results (JSON/CSV) plus executive summary in Markdown.
   - Highlight bottlenecks, scaling recommendations, and mitigation plan.
5. **CI/CD Integration** (Stretch)
   - Workflow that runs nightly or on-demand with thresholds enforcing quality gates.

## 🤖 AI Workflow

1. Use the [Performance Testing Template](../../templates/qa/performance-testing-template.md) to frame prompts.
2. Ask AI to draft load testing scripts with realistic user behaviour (browse, search, checkout).
3. Generate post-processing scripts (Node.js/Python) that parse results and create summary tables.
4. Ask AI to suggest remediation steps when targets are missed.

## ✅ Acceptance Criteria

- [ ] Performance scripts stored under `tests/performance/` with README instructions.
- [ ] Scenarios cover baseline, peak, and failure conditions.
- [ ] Results include visualisations or tables for latency distribution and error rates.
- [ ] Recommendations prioritised by impact and effort.
- [ ] Risks and next actions communicated to DevOps/Product.

## 🔍 Stretch Goals

- Capture browser-side metrics using Lighthouse or WebPageTest automation.
- Model cost impact of scaling decisions.
- Implement synthetic user journeys for continuous performance monitoring.

## 📚 Reference Materials

- [Testing Strategy Guide](../../docs/testing/testing-strategy.md)
- [Monitoring Template](../../templates/devops/monitoring-template.md)
- [AI Testing Guide](../../docs/ai-testing-guide.md)

---

**Timebox:** 3–4 hours. Coordinate with DevOps to provision test environments and monitoring dashboards.
