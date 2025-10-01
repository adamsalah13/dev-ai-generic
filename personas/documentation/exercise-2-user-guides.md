# Exercise 2: User Guide Development

## 🎯 Objective

Create an end-user guide for a key ShopFlow journey (e.g., product browsing, checkout, account management) using AI drafting paired with human editing.

## 📋 Scenario

Customer Success needs a step-by-step guide to help new shoppers complete their first purchase. You will document the checkout experience from the ShopFlow frontend, complete with screenshots and troubleshooting tips.

## 🛠️ Deliverables

1. `docs/user-guides/checkout-guide.md` covering:
   - Overview and prerequisites (account, payment method).
   - Step-by-step walkthrough with callouts.
   - Troubleshooting table for common issues.
   - FAQ and support escalation paths.
2. Annotated screenshots stored under `docs/user-guides/assets/` (use AI-generated placeholders if needed).
3. Revision history table with author and date.

## 🤖 AI Workflow

1. Start with the [User Guide Template](../../templates/documentation/user-guide-template.md).
2. Use AI to summarise each page in the checkout flow and suggest user-friendly language.
3. Ask AI to propose troubleshooting tips for payment failures, address validation, etc.
4. Generate alt-text and accessibility tips for screenshots.

## ✅ Acceptance Criteria

- [ ] Guide lives under `docs/user-guides/` with consistent formatting.
- [ ] Screenshots include captions and alt-text.
- [ ] Troubleshooting section lists at least five issues with resolutions.
- [ ] FAQ addresses security/privacy questions.
- [ ] Guide references related docs (returns policy, support contact).

## 🔍 Stretch Goals

- Localise the guide into a second language using AI translation + human review.
- Produce a short Loom/video script based on the guide.
- Add interactive checklist or printable PDF version.

## 📚 Reference Materials

- [User Guide Template](../../templates/documentation/user-guide-template.md)
- [Web Development Guide](../../docs/web-development-guide.md)
- [Sample App README](../../sample-app/README.md)

---

**Timebox:** 2 hours. Test the instructions on a teammate to validate clarity.
