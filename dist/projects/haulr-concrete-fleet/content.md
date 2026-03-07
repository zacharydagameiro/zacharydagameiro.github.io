## About
Designed and built Haulr as a **full-stack concrete logistics platform** with three app surfaces: customer site, operations dashboard, and admin tools. The dashboard supports lead intake, claim/archive flows, job creation, materials and labour tracking, expense tracking, scheduling, and client management.

> **Demo account:** Use **Email** `demo@haulrbc.com` and **Password** `124haurMe`. The demo resets every 24 hours.

## Highlights
- **Lead pipeline:** capture, claim, assign, archive, and track concrete requests through a single ops flow.
- **Quote to execution:** convert approved leads into jobs, then manage scheduling and execution state in the dashboard.
- **Job costing:** track materials, labour, expenses, files, and per-job cost totals for operational visibility.
- **Access control:** multi-company model with role/capability checks across owner/member workflows.
- **Quick stack:** **React**, **TypeScript**, **Vite**, **Tailwind/shadcn**, **Firebase Auth**, **Firestore**, **Cloud Functions**, **Mapbox**, **Stripe** (integration in progress).

## How it works
- The system is split into three React app surfaces: a public site for lead capture, an operations dashboard for daily workflows, and an admin surface for account/platform controls.
- Authentication is handled with **Firebase Auth**, and every write path is gated by role/capability checks before any state mutation runs.
- Core data lives in **Firestore** with company-scoped collections for leads, jobs, schedules, materials, labour, expenses, and files; document shape is normalized so totals and rollups can be computed deterministically.
- Sensitive mutations run through **Firebase Cloud Functions** (claim/archive, assignment, billing state updates, and other business-critical transitions) so rules are enforced **server-side** instead of client-side.
- **Stripe billing** is partially implemented (checkout/portal wiring and subscription-state handling are in progress, not fully completed yet), while **Mapbox geocoding** normalizes address inputs in operational flows.
- Practical request path: lead intake, then claim/assign, then quote/convert, followed by job execution updates and cost aggregation, with billing flows currently being finalized.

## What I would do next
- Finish integrating **Stripe** end-to-end (finalize **billing state transitions**, **access control**, and **production billing edge cases**).
- Add a **Shopify-style website builder** so concrete companies can create and host their public websites directly inside **Haulr**.
