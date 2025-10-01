# ShopFlow User Guide

## 🌟 Introduction

Welcome to ShopFlow, a modern commerce experience designed for hands-on learning. This guide walks end users through the mock storefront so you can explore features quickly and confidently while working with the provided sample data.

## 🧭 Getting Started

### Accessing ShopFlow

1. Launch the frontend server and open <http://localhost:5173>.
2. Sign in with a demo account if your instructor provided one, or create a local profile via **Register** (data is stored in your browser).
3. Stay signed in to access the Profile dashboard, order history mock data, and checkout flow.

### Browser Support

| Browser | Minimum Version | Notes |
| --- | --- | --- |
| Chrome | 115 | Fully tested reference browser. |
| Edge | 115 | Matches Chrome experience with Windows integration. |
| Firefox | 116 | Some experimental animations are disabled. |
| Safari | 16 | Use desktop Safari for best layout fidelity. |

## 🏠 Home Experience

- **Hero Banner:** Learn about current promotions with a call-to-action to start shopping.
- **Featured Categories:** Jump straight to curated collections such as Electronics, Clothing, Sports, and Books.
- **Featured Products:** Review quick snapshots of highlighted items with add-to-cart and quick-view actions.

### Quick Actions

| Action | How to Use |
| --- | --- |
| Search | Use the header search field. Results update when you submit the form; matches include name and description text. |
| Filters | Apply category and sort controls on `/products`. Filter changes automatically refresh the list. |
| Quick View | Hover over a product card and choose **Quick View** to log the selection (placeholder for future modal work). |
| Add to Cart | Click **Add to Cart** on product cards. The mock store logs the action to the console. |

## 🛍️ Browsing Products

1. Navigate to **Products** from the top nav.
2. Apply filters or sort options (Popularity, Price, Rating) to refine results.
3. Hover over a card to preview details or click **Quick View** for modal specs.
4. Select **View Details** for the full product page.

### Product Detail Highlights

- Image gallery with zoom and 360° demos.
- Specification tabs (Overview, Specs, Reviews, Q&A).
- Inventory badge showing stock level.
- Suggested add-ons powered by the recommendation engine sample.

## 🛒 Cart and Checkout

### Adding to Cart

- Select quantity (where applicable) before pressing **Add to Cart**.
- Cart icon in the header displays a running item count sourced from mock state.

### Reviewing Cart

1. Click the cart icon or visit `/cart`.
2. Adjust quantities or remove items directly.
3. View shipping estimate and taxes (mock data for learning scenarios).

### Checkout Flow

1. **Address:** Enter shipping details (auto-complete supports major cities).
2. **Delivery:** Select standard or express shipping.
3. **Payment:** Choose preferred payment method (card data is mocked; do not enter real details).
4. **Review:** Confirm order summary before clicking **Place Order**.

> ⚠️ Tip: Validation currently runs in the browser only. Instructors can extend the backend mock API in `sample-app/backend` to enforce stricter rules.

## 👤 Account Management

### Profile Dashboard

- Access via the avatar menu after signing in.
- Tabs include **Profile**, **Order History**, and **Settings** with demo data stored in `localStorage`.
- Update personal information and explore notification toggles; changes persist in the browser.

### Order History

- Review past orders with status indicators (Processing, Shipped, Delivered).
- Download invoices (PDF placeholders) for documentation exercises.
- Initiate returns via the **Request Support** action.

## 🛠️ Support Tools

- **Footer Links:** Provide quick navigation back to documentation in this repository.
- **Console Logs:** Many flows log debug details (search, cart, quick view) to help developers trace actions.
- **Status Banner Placeholder:** Static banner space on primary pages for DevOps exercises.

## 🔐 Security Tips

- Always sign out on shared machines using the avatar menu.
- Use strong passwords (12+ characters) and enable MFA if provided by the instructor.
- Do not share seeded credentials outside your learning cohort.

## 🧰 Accessibility Notes

- Keyboard navigation is enabled across major journeys (Tab, Shift+Tab, Enter).
- High-contrast mode activates automatically when the OS preference is detected.
- Screen readers announce dynamic content in product detail and cart pages.

## 📈 Performance Expectations

- Home and Products pages target <2s load times on broadband.
- Checkout steps cache form state to prevent data loss on refresh.
- Progressive enhancement ensures critical actions work without JavaScript animations.

## 🤝 Getting Help

| Channel | Description |
| --- | --- |
| Repository Docs | Refer to `docs/user-guide.md` (this file) and `docs/web-development-guide.md` for deeper dives. |
| Instructor Support | Reach out via your course communication channel (Slack/Teams). |
| Issue Tracking | Submit issues through the shared GitHub project to document bugs or enhancement ideas. |
| Self-Service | Use browser devtools console logs to trace interactions during troubleshooting. |

Happy exploring! ShopFlow is your sandbox for experimenting with AI-powered development while keeping the user experience front and centre.
