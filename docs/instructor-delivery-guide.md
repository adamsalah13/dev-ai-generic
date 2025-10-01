# ShopFlow Instructor Delivery Guide

## 🎯 Purpose

This guide helps instructors plan, deliver, and assess the ShopFlow learning experience. It outlines module sequencing, preparation steps, facilitation tips, and evaluation checkpoints across business analysis, development, QA, DevOps, and documentation personas.

## 📅 Course Roadmap

| Week | Theme | Core Outcomes | Key Assets |
| --- | --- | --- | --- |
| 1 | Orientation & BA Discovery | Learners articulate product vision, personas, and backlog. | `templates/business-analyst/requirements-template.md`, `personas/business-analyst/` exercises |
| 2 | Frontend Foundations | Teams scaffold UI, explore routing, and integrate mock data. | `sample-app/frontend`, `docs/web-development-guide.md` |
| 3 | API & Data Layer | Extend the mock Express server, practise contract-first design. | `sample-app/backend`, `docs/api-development-guide.md` |
| 4 | Quality Engineering | Automation patterns, performance baselines, exploratory testing. | `templates/qa/`, `personas/qa/` exercises |
| 5 | DevOps & Observability | CI/CD pipelines, infrastructure diagrams, monitoring dashboards. | `templates/devops/`, `personas/devops/` exercises |
| 6 | Documentation & Handover | Publish user guides, API references, support playbooks. | `docs/user-guide.md`, `templates/documentation/` |

> Adjust pacing for bootcamps (3-week intensive) by pairing modules 1+2, 3+4, 5+6.

## ✅ Pre-Course Checklist

- [ ] Review latest commits in `main` for updates to sample app or templates.
- [ ] Run `npm install` in both `sample-app/frontend` and `sample-app/backend`.
- [ ] Verify linting/formatting via project README instructions.
- [ ] Review `sample-app/backend/src/data/products.ts` and adjust mock inventory if desired.
- [ ] Confirm access to shared collaboration tools (GitHub, Slack/Teams, Miro).
- [ ] Update schedule with local holidays and cohort-specific milestones.

## 🛠️ Environment Setup Guidance

### Instructor Spin-Up

```powershell
# Frontend (pwsh)
cd sample-app/frontend
npm install
npm run dev

# Backend (pwsh)
cd ../backend
npm install
npm run dev
```

- Use session recordings or live demos to showcase Vite’s hot reload and API responses from Express stubs.
- Demonstrate where learners can plug in databases, authentication, or cloud services by referencing the archived `api-gateway/` blueprint.

### Learner Support Tips

- Encourage pair programming; designate rotating “navigator” roles.
- Offer the optional Docker Compose file for advanced cohorts (review services and environment variables before class).
- Provide sample `.env.example` files if you extend the backend with real secrets.

## 🧑‍🏫 Facilitation Strategies

### Daily Flow

1. **Stand-up (10 min):** Share wins, blockers, and plan-of-day.
2. **Micro-lesson (20 min):** Introduce a concept aligned with persona exercises.
3. **Guided Lab (60–90 min):** Learners implement tasks with instructor roaming support.
4. **Show & Tell (15 min):** Teams demo progress and discuss decisions.
5. **Retro (10 min):** Capture insights, update parking lot questions.

### Engagement Boosters

- Rotate through personas each day to highlight cross-functional perspectives.
- Use “challenge cards” with stretch goals (e.g., add caching, create synthetic monitoring).
- Integrate AI pairing sessions: prompt students to co-create tests or documentation with Copilot.

## 🧪 Assessment Framework

### Formative

- Observations during labs and code reviews.
- Quick quizzes (Kahoot/Forms) on architecture, testing, or DevOps topics.
- Daily “commit check” ensuring learners push incremental changes.

### Summative

| Milestone | Evidence | Criteria |
| --- | --- | --- |
| BA Playback | Persona-driven backlog & journey maps | Clarity, prioritisation, stakeholder alignment |
| Dev Sprint | Feature branches merged with tests | Code quality, AI-assisted workflows, documentation |
| QA Showcase | Automation suite + performance dashboard | Coverage, reliability metrics, defect storytelling |
| DevOps Demo | CI/CD pipeline & observability runbook | Automation depth, recovery plans, monitoring |
| Documentation Drop | User guide + knowledge base articles | Accuracy, accessibility, voice consistency |

## 🚨 Common Issues & Remedies

| Symptom | Likely Cause | Instructor Response |
| --- | --- | --- |
| Vite fails to start | Port conflict or missing dependencies | Stop other dev servers; delete `node_modules` and reinstall. |
| API returns 404 | Express mock server not running | Remind learners to start `npm run dev` inside `sample-app/backend` or extend routes as needed. |
| Tests timing out | Async handling or missing mock | Demonstrate use of fake timers or dependency injection. |
| Learners blocked on AI tools | Prompt fatigue or unclear expectations | Share prompt engineering cheatsheets; pair learners across skill levels. |
| Documentation drift | Code updates outpace docs | Schedule mid-week doc sync using `templates/documentation/`. |

## 📚 Reference Materials

- `../SYSTEM_DESIGN.md` – application context and architectural decisions.
- `docs/deployment/` – platform-specific deployment runbooks.
- `docs/testing/` – strategy guides and persona exercises.
- `templates/` – reusable AI prompt templates for each discipline.
- `personas/` – scenario-based exercises aligned with assessments.

## 🗂️ Resources to Share with Learners

- [ShopFlow User Guide](./user-guide.md)
- [Web Development Guide](./web-development-guide.md)
- [API Development Guide](./api-development-guide.md)
- [Documentation Guide](./documentation/README.md)
- Persona-specific README files under `personas/`.

## 🧭 Retrospective Template

```markdown
### What went well?
- 
- 

### What could improve?
- 
- 

### Action items
- Owner:
- Due:
```

Encourage facilitators to capture retro notes in a shared document after each module.

## 🏁 Final Showcase Ideas

- Host a mini “demo day” where teams present core flows plus stretch goals.
- Invite guest reviewers (product, security, UX) for authentic feedback.
- Provide digital badges or certificates recognising persona mastery.

## 🤝 Post-Course Follow-Up

- Share recordings, slides, and repositories within 48 hours.
- Gather feedback via survey; document insights in the retro template.
- Publish a short summary highlighting learner achievements and next steps (mentorship, advanced tracks).

By following this guide, instructors can deliver a cohesive, high-impact ShopFlow learning journey that blends AI-assisted development, teamwork, and continuous improvement.
