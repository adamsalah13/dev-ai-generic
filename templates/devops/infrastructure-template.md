# Infrastructure as Code Planning Template

Use this template with your AI assistant to generate Infrastructure as Code (IaC) assets for the ShopFlow platform.

## 🎯 Goal

Describe the infrastructure goal clearly. Example:

- Deploy ShopFlow backend API and database to Azure using Terraform.
- Provision staging and production Kubernetes clusters for ShopFlow.

## 🧩 Context to Share with AI

- Target cloud provider and region.
- Runtime stack (Node.js API, MongoDB, Redis, etc.).
- Networking requirements (VNETs, subnets, ingress rules).
- Security requirements (secrets management, RBAC, policies).
- Observability stack (logs, metrics, tracing).
- Environments to support (dev / test / prod).

## 🗂️ Desired Output

Ask the AI for:

- IaC project structure (folders, modules).
- Terraform variables and state storage strategy.
- Resource definitions with tags and naming conventions.
- Documentation: README with deployment steps and diagrams.
- Test plan for validating infrastructure after provisioning.

## 🤖 Prompt Starter

```text
Act as a senior DevOps engineer. Generate Terraform IaC to deploy the ShopFlow e-commerce platform with the following requirements:
- Cloud: <provider>
- Region: <region>
- Components:
  - API gateway (Node.js Express) containerized
  - MongoDB + Redis
  - VNet with public/private subnets
  - Application Insights / CloudWatch equivalent
- Security: RBAC, managed identity/role assignments, HTTPS only
- Scaling: autoscaling rules defined for API tier
- Outputs: endpoints, connection strings, resource IDs
Produce:
1. Terraform module layout with files
2. main.tf, variables.tf, outputs.tf, providers.tf
3. Deployment instructions
4. Validation checklist after `terraform apply`
```

## ✅ Review Checklist

- [ ] Remote state configured (Terraform Cloud, Azure Storage, S3, etc.).
- [ ] Variables documented with defaults and descriptions.
- [ ] Sensitive values marked as `sensitive = true`.
- [ ] Modules or resource groups logically organized.
- [ ] Tags applied consistently for cost management and ownership.
- [ ] Security groups / NSGs restrict traffic appropriately.
- [ ] Monitoring and alerting resources defined.
- [ ] Post-deployment validation steps captured.

## 🔄 Follow-up Prompts

- "Generate policy-as-code to enforce HTTPS and tagging standards."
- "Add blue/green deployment support to the existing Terraform plan."
- "Create teardown scripts and document how to destroy the environment safely."

## 📦 Deliverables Folder Structure

```text
infrastructure/
├── README.md
├── main.tf
├── variables.tf
├── outputs.tf
├── providers.tf
├── modules/
│   ├── network/
│   ├── compute/
│   └── databases/
└── scripts/
    ├── plan.sh
    └── apply.sh
```
