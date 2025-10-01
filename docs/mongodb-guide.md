# MongoDB Schema Design Guide

## 🧾 Purpose

Use this guide when modelling ShopFlow collections or preparing labs inside the developer exercise. It complements the [database design guide](./database-design-guide.md) with MongoDB-specific tips.

## 🧱 Core Collections

- **Users** – customer and admin profiles with RBAC metadata.
- **Products** – catalog entries with variants, inventory, search metadata, and merchandising flags used by the new frontend pages.
- **Orders** – checkout, payment, and fulfilment data with audit history.
- **Carts/Wishlists** – session and persistent shopping interactions.
- **Reviews** – product feedback tied to orders to prevent spam.

## 🔄 Relationships

- Use references (ObjectId) between orders, users, and products for consistency.
- Embed sub-documents for small arrays that require atomic updates (e.g., addresses, order items).
- Leverage change streams to trigger cache invalidation or analytics pipelines.

## ⚙️ Performance

- Create compound indexes for catalog filtering: `{ category: 1, "pricing.price": 1 }`.
- Use text indexes for search across name, brand, and tags.
- Maintain TTL indexes for ephemeral data (password resets, sessions).

## 🛡️ Data Governance

- Encrypt sensitive fields at rest (payment tokens, PII) using client-side encryption or Key Vault integration.
- Track schema evolution through versioned migration scripts checked into `database/migrations/`.
- Align retention policies with the [testing strategy](./testing/testing-strategy.md) and QA data management practices.

## 🧪 Validation & Testing

- Define JSON schema validation for each collection; enforce through Mongoose schemas.
- Seed realistic fixture data to support the profile, checkout, and admin pages now available in the frontend.
- Include database integration tests in CI with clean fixture teardown.

---

For deeper modelling examples, review the entity diagrams inside `docs/database-design-guide.md` and keep the deployment guides nearby for environment configuration.
