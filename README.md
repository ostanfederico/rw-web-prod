# RW Product Whiteboard

The **Product Whiteboard** is a Progressive Web App that PMs and designers at RockWallet use to prototype mobile flows. It's frontend-only with mocked data. You install it on your phone via "Add to Home Screen" and iterate.

This is **Phase 1** of a larger arc. When a component reaches "ready" here, it graduates to the (separate) `@rockwallet/ui` design-system repo, gets published to npm, and is then consumed by the native Swift / Kotlin apps via WebView. See [`docs/ROADMAP.md`](./docs/ROADMAP.md).

## What's in this repo

- **Next.js 16 (App Router)** + **Tailwind CSS v4** + **TypeScript**
- An app-shell with bottom nav: Home / Components / Flows / More
- PWA manifest + Apple meta tags so it installs on iPhone and Android
- Design tokens seeded from RockWallet's native theme; mapped to the Prometheus Figma library

## Quick start (local)

```bash
npm install
npm run dev
```

Open <http://localhost:3000> and resize the window to ~390 px wide to preview phone layout.

## How the team works

→ Read [`docs/WORKFLOW.md`](./docs/WORKFLOW.md) — branches, preview URLs, how to add a flow or component.
→ Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) — short version of the same.
→ Read [`docs/ROADMAP.md`](./docs/ROADMAP.md) — where this is going.

## Links

- GitHub: <https://github.com/ostanfederico/rw-web-prod>
- Vercel: <https://vercel.com/federico-ostan-bazans-projects/rw-web-prod>
- Prometheus Design System (Figma): <https://www.figma.com/design/vT4esHtsM9b4JdCy2q5Nex/Prometheus-Design-System>
- Prometheus Icons (Figma): <https://www.figma.com/design/R94pMAkvOLPDbJZFSVOg8E/Prometheus-Icons>
