# RW Product Whiteboard — Claude / agent guide

This repo is a **Progressive Web App canvas** for RockWallet PMs and designers to prototype mobile flows. Frontend-only. Mocked data only. No real APIs.

Production: <https://rw-web-prod-federico-ostan-bazans-projects.vercel.app>
Repo: <https://github.com/ostanfederico/rw-web-prod>
Vercel project: `prj_seufzDAmdAXmbuqNXwmqPVhQOxn2` (team `federico-ostan-bazans-projects`)

## Architecture in one paragraph

Next.js 16 (App Router, Turbopack) + Tailwind CSS v4 + TypeScript. Mobile-first: every page renders inside a `.phone-frame` (`max-width: 440px`) with a sticky `BottomNav` and a window-level pull-to-refresh that wraps `children` in the root layout. Tokens live in `styles/tokens.css` (Tailwind v4 `@theme` block). All routes are static and prerendered.

## Where to put things

- New flow → `app/flows/<name>/page.tsx`
- New component preview → `app/components/<name>/page.tsx`
- New reusable component → `components/ui/<name>/`
- App-shell pieces → `components/app-shell/` (`BottomNav`, `PullToRefresh`, `PageHeader`, `EmptyState`)
- Mocked data → `lib/mock/`
- Class-merging helper → `@/lib/cn`

## Mobile / PWA constraints (already wired in `app/layout.tsx` + `globals.css`)

- `viewport-fit=cover`, `user-scalable=no`, `maximum-scale=1`
- Body has `padding-top: env(safe-area-inset-top)` and `padding-bottom: env(safe-area-inset-bottom)` — **do not** add your own safe-area padding to pages; it'll double up.
- `apple-mobile-web-app-status-bar-style: black-translucent` — content visually extends behind the status bar but the body padding keeps real content clear.
- `overscroll-behavior: none` on root — required for our manual pull-to-refresh; never disable.
- Pull-to-refresh lives at `components/app-shell/PullToRefresh.tsx`. It listens at the window level and reloads the page when the gesture passes ~70px. Fires on every route automatically (it's in the root layout).
- BottomNav is fixed, max-w 440 px, also safe-area-aware. Account for it: pages have `pb-24` from the layout wrapper. If your page needs more bottom space, add it inside `<main>`, not at the wrapper.

## Hard rules

- **Never** hardcode hex values. Always use CSS variables from `styles/tokens.css`.
- **Never** add real network calls or auth. This canvas is mock-only.
- **Don't** add tests in this repo. Tests come at graduation time in `@rockwallet/ui`.
- Use `lucide-react` icons; match the visual weight of `BottomNav` (size 22 for primary, 16 for trailing/inline, 28 for empty-state hero).
- `"use client"` only when you need browser APIs.

## Claude Code config (`.claude/`) — shared with the team

`.claude/` is **checked into git**. Skills, slash commands, agents, hooks, and the shared `settings.json` live there so the whole team gets the same Claude experience on clone.

- **Shared (committed):** `.claude/skills/`, `.claude/commands/`, `.claude/agents/`, `.claude/hooks/`, `.claude/settings.json`.
- **Local-only (gitignored):** `.claude/settings.local.json`, `.claude/scheduled_tasks.lock`, `.claude/projects/`, `.claude/todos/`, `.claude/cache/`. See `.gitignore` for the canonical list.
- **Never commit secrets.** No API keys, no tokens, no machine-specific paths. If you add something sensitive, gitignore it explicitly.
- **Adding a new component** is wired through the `new-component` skill — invoke via `/new-component` or just say "let's build {ComponentName}".

## Vercel config

- Framework preset is pinned in `vercel.json` (`{"framework": "nextjs"}`). The Vercel project was originally created as "Other"; without this file, prerendered routes 404 at the edge even when the build succeeds. Don't remove it.
- No custom build/output config — Next.js defaults.
- Deployment Protection is **off**. Anyone with the URL can view. The canvas is mock-only, no secrets — keep it that way.

## The bigger picture

When a component is settled, it graduates to a separate repo (`@rockwallet/ui` on npm). See `docs/ROADMAP.md`. Native iOS/Android apps eventually consume those components inside `WKWebView` / `WebView`. The canvas here is *not* loaded inside a WebView — it's a real PWA installed on phones via Add-to-Home-Screen.

## Design source of truth

- Prometheus Design System (Figma): `vT4esHtsM9b4JdCy2q5Nex` — <https://www.figma.com/design/vT4esHtsM9b4JdCy2q5Nex/Prometheus-Design-System>
- Prometheus Icons (Figma): `R94pMAkvOLPDbJZFSVOg8E` — <https://www.figma.com/design/R94pMAkvOLPDbJZFSVOg8E/Prometheus-Icons>
- Native theme references: `/Users/fostan/rockwallet-repos/wallet-v2-android/theme/`, `/Users/fostan/rockwallet-repos/wallet-v2-ios/RockWallet/Foundation/RWSystemDesign/`
- Prometheus token namespace (slash → dash convention when promoted to CSS):
  - `Color/*` (e.g. `Icon/Body`, `Text/Body`) → `--color-*`
  - `Size/*` (e.g. `Size/300` = 12px) → `--size-*`
  - `Space/*` (e.g. `Space/100` = 4px) → `--space-*`
  - `font-weight/*` → `--font-weight-*`
- Today's `tokens.css` is **seeded from the Android theme** (`Color.kt`, `Spacing.kt`); full Prometheus extraction is a separate pending session.

## Related repos worth knowing about

- [`@mnee-ui/ui`](https://github.com/mnee-xyz/mnee-ui) at `/Users/fostan/mnee-ui` — the model for the future `@rockwallet/ui`. Same pattern: vanilla Tailwind v4, `cn()`, `Record<Variant, string>` for variants, Federico publishes manually.
- `wallet-v2-android` and `wallet-v2-ios` at `/Users/fostan/rockwallet-repos/` — the native apps that will eventually consume `@rockwallet/ui` inside WebViews.
