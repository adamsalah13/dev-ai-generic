# Database Design Notes

## 📦 Overview

Use this companion to the [database design guide](./database-design-guide.md) when aligning schema work with the new ShopFlow flows.

## 🧱 Entity Highlights

- **Customer**: profile, preferences, addresses, loyalty balances.
- **Product**: variants, availability, merchandising flags, SEO metadata.
- **Order**: lifecycle states (pending → paid → fulfilled → returned) with timeline history.
- **Cart/Wishlist**: ephemeral vs persistent shopping interactions.
- **Admin**: moderation logs and action audit trails.

## 🔄 Data Integrity

- Enforce referential integrity through application logic and background jobs.
- Maintain derived views for analytics dashboards used in the admin page.
- Track mock data updates in `sample-app/backend/src/data/` until you introduce a real database.

## 🔐 Compliance

- Separate PII and transactional data where possible to simplify GDPR requests.
- Support soft deletes and retention policies aligned with legal requirements.
- Mirror backup and restore procedures outlined in the Azure deployment playbook.

## 📚 Resources

- [Database design guide](./database-design-guide.md)
- [MongoDB schema guide](./mongodb-guide.md)
- [Testing strategy](./testing/testing-strategy.md)

---

Keep this note handy when refining the data model so that downstream personas (developer, QA, documentation) have a reliable foundation.
