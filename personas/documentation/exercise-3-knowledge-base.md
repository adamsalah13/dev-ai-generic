# Exercise 3: Knowledge Base Setup

## 🎯 Objective

Design a scalable knowledge base structure for ShopFlow that blends AI-generated content with curated human edits.

## 📋 Scenario

Support is preparing for launch and needs a searchable knowledge base containing how-to guides, troubleshooting articles, and release notes. You will define taxonomy, authoring workflow, and automation plan.

## 🛠️ Deliverables

1. Information architecture document (`docs/knowledge-base/architecture.md`) covering:
   - Categories, tagging strategy, and navigation model.
   - Content lifecycle (draft, review, publish, retire).
2. Sample article set:
   - At least three articles drafted with AI and edited for tone/accuracy.
   - Each article includes metadata (owner, last updated, related articles).
3. Automation plan:
   - Workflow diagram for content updates.
   - Search optimisation checklist (keywords, synonyms).
   - Proposal for integrating with support tools (e.g., Zendesk, Intercom).

## 🤖 AI Workflow

1. Prompt AI to propose taxonomy and metadata based on existing documentation.
2. Generate article skeletons using past incidents or FAQs as prompts.
3. Use AI to craft review checklists and publishing checklists.
4. Ask AI for automation ideas (webhooks, CI validation, translation workflows).

## ✅ Acceptance Criteria

- [ ] Knowledge base structure documented with diagram or table.
- [ ] Three sample articles committed under `docs/knowledge-base/articles/`.
- [ ] Automation plan describes tooling, triggers, and owners.
- [ ] Governance section lists review cadence and SLAs.
- [ ] Recommendations include AI assistive tooling while keeping humans-in-the-loop.

## 🔍 Stretch Goals

- Prototype a Git-based publishing workflow using MkDocs or Docusaurus.
- Add analytics plan to track article usefulness.
- Map persona journeys to knowledge base content gaps.

## 📚 Reference Materials

- [Technical Writing Template](../../templates/documentation/technical-writing-template.md)
- [Prompting Guide](../../docs/prompting-guide.md)
- [AI Testing Guide](../../docs/ai-testing-guide.md)

---

**Timebox:** 3 hours. Align with Support and Product Marketing for content priorities.
