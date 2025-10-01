# ShopFlow Sample Application

## 🛒 Overview

ShopFlow is a teaching application that showcases modern commerce UX patterns using mock data on the frontend and lightweight backend stubs. It is intentionally scaffolded so learners can practice AI-assisted development across personas—connecting APIs, building tests, writing documentation, and experimenting with deployment.

## 🧱 Architecture Snapshot

```text
Frontend (React + Vite + Tailwind CDN)
    ↕
Mock API (Express + in-memory fixtures)
    ↕
Legacy Blueprint (archived api-gateway reference for advanced labs)
```

- **Frontend:** React 18 with Vite tooling, Tailwind utility classes loaded via CDN, TypeScript for type safety.
- **Backend:** Lightweight Express server serving mock product data from `src/data`. A legacy `api-gateway/` blueprint is archived for instructors to discuss production-ready patterns.
- **Tooling:** ESLint, TypeScript configs, and JSON/YAML templates wired to the broader course documentation.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Frontend

```bash
cd sample-app/frontend
npm install
npm run dev
```

This launches Vite on <http://localhost:5173> with hot reload.

### Backend (mock API)

```bash
cd sample-app/backend
npm install
npm run dev
```

> ℹ️ The running server listens on <http://localhost:4000> and exposes mock `GET /api/products` and `GET /api/products/:id` endpoints. The `api-gateway/` directory is a legacy blueprint—treat it as reading material until you expand the backend.

## 📁 Project Structure

```text
sample-app/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── components/
│       ├── pages/
│       └── styles/
└── backend/
    ├── package.json
    ├── api-gateway/              # Archived production blueprint (optional reading)
    ├── tsconfig.json
    └── src/
        ├── data/
        ├── index.ts             # Active mock server entrypoint
        └── routes/
```

## 🧭 Frontend Routes

| Route | Component | Highlights |
| --- | --- | --- |
| `/` | `HomePage` | Hero merchandising, featured categories, and promotional grid. |
| `/products` | `ProductsPage` | Filtering, sorting, pagination, and mock cart hooks. |
| `/products/:id` | `ProductDetailPage` | Image gallery, specs tabs, reviews feed. |
| `/cart` | `CartPage` | Order summary view with quantity controls. |
| `/checkout` | `CheckoutPage` | Multi-step form scaffolding for delivery and payment. |
| `/login`, `/register` | `LoginPage`, `RegisterPage` | Form validation stubs ready for auth integration. |
| `/profile` | `ProfilePage` | Tab-friendly layout for account data and order history. |
| `/admin` | `AdminDashboard` | Inventory snapshot, user list, and management tabs. |
| `*` | `NotFoundPage` | Learner-friendly guidance for debugging routes. |

## 🧪 Testing Hooks

- Frontend includes Vitest + Testing Library dependencies (tests to be authored in labs).
- Backend package.json wires Jest + Supertest (learners create suites during API exercises).
- QA persona exercises reference `tests/` directories under the project root for automation harnesses.

## 🛠️ Where Learners Add Value

| Persona | Suggested Enhancements |
| --- | --- |
| Business Analyst | Extend requirements in `docs/user-guide.md`, produce new flows for wishlist/payments. |
| Developer | Replace mock data with real API calls, secure auth, flesh out order APIs. |
| QA | Build automation harnesses, performance suites, and reliability monitors. |
| DevOps | Containerise services, add Terraform/Bicep, configure pipelines. |
| Documentation | Publish API specs, user guides, and knowledge base articles using new templates. |

## 📚 Helpful Links

- [User Guide](../docs/user-guide.md)
- [Instructor Delivery Guide](../docs/instructor-delivery-guide.md)
- [Web Development Guide](../docs/web-development-guide.md)
- [API Development Guide](../docs/api-development-guide.md)

---

This README reflects the scaffolded state of the sample app as of September 2025. Use it as a launchpad for the course labs—augment, refactor, and document as you progress.
