# Exercise 2: Infrastructure Automation with AI

## 🎯 Objective

Use AI tooling to design and implement Infrastructure as Code (IaC) that provisions the ShopFlow platform's core services in a repeatable manner.

## 📋 Scenario

ShopFlow is expanding from local development to shared staging environments. You are responsible for automating the provisioning of networking, compute, and data stores using Terraform (or an IaC tool of your choice). The output should be production-ready, version-controlled, and documented.

## 🛠️ Deliverables

1. **IaC Project Structure**
   - Terraform (preferred) or Bicep/CDK modules organised by concern (network, compute, data).
   - Remote state storage and backend configuration.
2. **Environment Configuration**
   - Parameterised variables for dev/staging/prod.
   - Secrets strategy (Key Vault, AWS Secrets Manager, etc.) documented.
3. **Automation Scripts**
   - `plan` and `apply` scripts with guardrails.
   - Validation script or checklist post-deployment.
4. **Documentation**
   - `infrastructure/README.md` with architecture overview, deployment steps, rollback plan.
   - Diagram (Mermaid or draw.io link) explaining resource relationships.

## 🤖 AI Workflow

1. **Kick-off Prompt**
   - Use the [Infrastructure Planning Template](../../templates/devops/infrastructure-template.md) to gather context.
2. **Module Generation**
   - Prompt AI to generate Terraform modules for VNet/VPC, container app hosting, MongoDB, and Redis caches.
   - Ask for security best practices (private endpoints, NSGs, firewall rules).
3. **Validation**
   - Request automated tests or policy checks (e.g., `terraform validate`, `tflint`, policy-as-code).
4. **Documentation**
   - Generate deployment and rollback instructions with AI, then edit for accuracy.

## ✅ Acceptance Criteria

- [ ] Repo contains `infrastructure/` folder with IaC code and documentation.
- [ ] Config supports at least two environments via variables or workspaces.
- [ ] Scripts or pipelines exist for plan/apply/destroy with clear instructions.
- [ ] Security and compliance considerations captured (encryption, networking, access control).
- [ ] Diagram or table summarises provisioned resources.
- [ ] README includes troubleshooting and cost estimation notes.

## 🔍 Stretch Goals

- Integrate with GitHub Actions for automated `terraform plan` on pull requests.
- Add automated drift detection or reporting.
- Implement blue/green or canary deployment pattern for the API gateway.

## 📚 Reference Materials

- [Infrastructure Template](../../templates/devops/infrastructure-template.md)
- [Azure Deployment Guide](../../docs/deployment/azure-deployment.md)
- [Docker Deployment Guide](../../docs/deployment/docker-deployment.md)
- [Monitoring Template](../../templates/devops/monitoring-template.md) for future exercises

---

**Timebox:** 4–6 hours. Collaborate with developers and QA to validate endpoints after provisioning.
