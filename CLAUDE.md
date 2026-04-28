# RW Product Whiteboard — Claude / agent guide

This repo is a **PWA canvas** for RockWallet PMs and designers to prototype mobile flows. Frontend-only. Mocked data only. No real APIs.

## Architecture in one paragraph

Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript. Mobile-first: every page is rendered inside a `.phone-frame` (max-width 440px) with a sticky `BottomNav`. Tokens live in `styles/tokens.css` (Tailwind v4 `@theme` block). Routes are static.

## Where to put things

- New flow → `app/flows/<name>/page.tsx`
- New component preview → `app/components/<name>/page.tsx`
- New reusable component → `components/ui/<name>/`
- App-shell pieces (header/nav/empty state) → `components/app-shell/`
- Mocked data → `lib/mock/`
- Class-merging helper → `@/lib/cn`

## Hard rules

- **Never** hardcode hex values. Always use CSS variables from `styles/tokens.css`.
- **Never** add real network calls or auth. This canvas is mock-only.
- **Don't** add tests in this repo. Tests come at graduation time in `@rockwallet/ui`.
- Use `lucide-react` icons; match the visual weight of `BottomNav`.
- `"use client"` only when you need browser APIs.

## The bigger picture

When a component is settled, it graduates to a separate repo (`@rockwallet/ui` on npm). See `docs/ROADMAP.md`. Native apps consume those components via WebView.

## Design source of truth

- Prometheus Design System (Figma): vT4esHtsM9b4JdCy2q5Nex
- Prometheus Icons (Figma): R94pMAkvOLPDbJZFSVOg8E
- Native theme references: `/Users/fostan/rockwallet-repos/wallet-v2-android/theme/`, `/Users/fostan/rockwallet-repos/wallet-v2-ios/RockWallet/Foundation/RWSystemDesign/`
