# AI-Driven Development Course

A comprehensive hands-on course for development teams to learn AI-driven development processes from Business Analysis to Quality Assurance and Documentation.

## 🎯 Course Overview

This course introduces development teams to modern AI-powered workflows that span the entire software development lifecycle. Participants will learn to leverage AI tools like GitHub Copilot, Cursor AI, and VSCode extensions to streamline processes from requirements gathering to deployment and documentation.

## 👥 Target Personas

This course is designed for cross-functional development teams including:

- **Business Analysts (BA)** - Requirements gathering and user story creation
- **Product Owners** - Feature planning and backlog management
- **Developers** - Code implementation and testing
- **DevOps Engineers** - CI/CD pipeline management
- **Quality Assurance (QA)** - Testing strategy and automation
- **Technical Writers** - Documentation and knowledge management

## 🏗️ Course Structure

### Module 1: Foundation Setup
- Repository setup and collaboration workflows
- VSCode/Cursor AI agent configuration
- GitHub Copilot integration
- Fork and contribution workflows

### Module 2: Persona-Specific AI Workflows
- BA: AI-assisted requirements analysis
- Developer: AI-powered code generation
- QA: AI-driven test automation
- Documentation: AI-enhanced technical writing

### Module 3: End-to-End Integration
- Connecting AI workflows across personas
- Automated CI/CD with AI assistance
- Quality gates and automated reviews
- Deployment and monitoring

### Module 4: Real-World Application
- Building a complete web application
- Database design and implementation
- API development with AI assistance
- Frontend development with modern frameworks

## 🚀 Getting Started

1. **Fork this repository** to your GitHub account
2. **Clone your fork** locally
3. **Follow the setup guides** in each persona directory
4. **Complete the exercises** in sequence
5. **Submit pull requests** for review

## 📁 Repository Structure

```
├── docs/                       # Course documentation, guides, and new user/instructor playbooks
├── personas/                   # Persona-specific guides and exercises
│   ├── business-analyst/
│   ├── developer/
│   ├── devops/
│   ├── qa/
│   └── documentation/
├── sample-app/                 # React storefront + backend stubs for labs
├── templates/                  # Prompt and documentation templates
├── SYSTEM_DESIGN.md            # High-level architecture notes
└── README.md
```

## 🧭 Sample Application Highlights

The `sample-app/frontend` project ships with mock-driven commerce experiences that align with the training labs:

- **Home Page** – hero merchandising, featured categories, and curated items.
- **Products Catalog** (`/products`) – faceted search, sorting, pagination, and quick-add hooks.
- **Product Detail** (`/products/:id`) – gallery carousel, specs tabs, ratings, and upsell copy.
- **Cart & Checkout** (`/cart`, `/checkout`) – order review, form validation stubs, and confirmation screen.
- **Auth Flows** (`/login`, `/register`) – ready-to-wire forms with validation helpers.
- **Profile Dashboard** (`/profile`) – account summary placeholders to integrate with APIs.
- **Admin Workspace** (`/admin`) – inventory snapshot, tabbed management views, and guard rails.

Each persona exercise references these screens so learners can implement API integrations, testing, and documentation against tangible UI surfaces.

## 📘 Key Documentation

| Topic | Location | What it Covers |
| --- | --- | --- |
| Frontend & API guidance | `docs/web-development-guide.md`, `docs/api-development-guide.md` | Patterns, prompting ideas, and checklists for building ShopFlow features. |
| Data modelling | `docs/database-design-guide.md` | Entity design, relationships, and persistence practices for the course backend. |
| Deployment playbooks | `docs/deployment/azure-deployment.md`, `docs/deployment/docker-deployment.md` | End-to-end instructions for pushing ShopFlow to Azure or container platforms. |
| Quality strategy | `docs/testing/testing-strategy.md` | Testing pyramid, tooling, and guardrails used across the labs. |
| AI tooling primer | `docs/github-copilot-guide.md`, `docs/cursor-ai-guide.md` | Prompt patterns and workflows tailored to this curriculum. |
| Learner support | `docs/user-guide.md` | End-user walkthroughs of the sample app experience. |
| Instructor facilitation | `docs/instructor-delivery-guide.md` | Delivery agenda, checkpoints, and assessment guidance. |

## 🛠️ Prerequisites

- GitHub account
- Git basics knowledge
- VSCode or Cursor IDE
- Basic understanding of software development lifecycle
- Interest in AI-powered development workflows

## 📚 Learning Outcomes

By the end of this course, participants will be able to:

- ✅ Set up and configure AI development environments
- ✅ Use AI tools effectively for their specific role
- ✅ Collaborate across personas using AI-enhanced workflows
- ✅ Implement end-to-end CI/CD pipelines with AI assistance
- ✅ Build modern web applications with AI assistance
- ✅ Create and maintain AI-generated documentation
- ✅ Establish quality gates and automated review processes

## 🤝 Contributing

This is a collaborative learning environment. Please:

1. Fork the repository
2. Create feature branches for exercises
3. Submit pull requests for review
4. Participate in code reviews
5. Share learnings with the team

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.
