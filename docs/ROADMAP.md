# Roadmap

The Product Whiteboard is one node in a larger pipeline. Here's where it sits and where it's going.

```
[ designer pushes branch ]
        ↓
[ rw-web-prod (this repo, PWA) ]            ← Phase 1: canvas (we are here)
        ↓  (component graduates)
[ @rockwallet/ui (separate repo, npm) ]     ← Phase 2
        ↓  (native dev installs)
[ Swift / Kotlin apps render in WebView ]   ← Phase 3
        ↓
[ Prometheus tokens unify all 3 surfaces ]  ← Phase 4
```

---

## Phase 1 — Canvas live (now)

**Status:** in progress.

- [x] Next.js 16 PWA scaffold with bottom nav, four routes
- [x] PWA manifest + Apple meta tags (Add-to-Home-Screen on iOS + Android)
- [x] Design tokens seeded from native Android theme; mapped to Prometheus namespace
- [x] Vercel deploy, password-protected preview + production
- [x] Workflow doc for non-engineer team
- [ ] First real flow added by a designer end-to-end (validation milestone)
- [ ] Service worker for offline shell (deferred — manifest alone is enough for install)
- [ ] Full Prometheus token extraction from Figma (currently seeded from Android values)

---

## Phase 2 — `@rockwallet/ui` design-system repo

**Trigger:** the first component reaches "ready" (visual + behavior settled, used in two flows).

What we'll do:
- New GitHub repo: `rockwallet/ui` (or similar)
- Modeled on [`@mnee-ui/ui`](https://github.com/mnee-xyz/mnee-ui): vanilla Tailwind v4, no ShadCN runtime, `cn()` utility, `Record<Variant, string>` for variants
- Published to npm as `@rockwallet/ui`
- Federico publishes manually (same model as mnee-ui)
- The canvas (this repo) starts importing from `@rockwallet/ui`:

```bash
npm install @rockwallet/ui
```

```tsx
import { Button } from "@rockwallet/ui";
```

A graduated component is **deleted** from `components/ui/` here and imported from npm instead. The canvas becomes a *consumer* of the design system, not just an incubator.

---

## Phase 3 — Native consumption via WebView

**Trigger:** Phase 2 is shipping at least 5 stable components.

Native iOS / Android engineers consume `@rockwallet/ui` by:
1. Installing the npm package in a small build pipeline (or bundling components as static HTML)
2. Loading the resulting bundle inside `WKWebView` (iOS) / `WebView` (Android) inside their Swift / Kotlin apps
3. Communicating with the native shell via JS bridges for things the web can't do (camera, biometrics, secure storage)

This is how the same component renders identically across web canvas + native apps without forking.

---

## Phase 4 — Code Connect + token unification

- **Code Connect**: each component in `@rockwallet/ui` gets a `*.figma.tsx` mapping file, so when a designer or AI tool reads the Prometheus Figma file it knows exactly which code component to use
- **Token unification**: tokens live in one source (Figma Variables → exported via Style Dictionary or direct MCP extraction) and generate three outputs:
  - `tokens.css` for web (`@rockwallet/ui` and this canvas)
  - Compose `Color.kt` / `Spacing.kt` for Android
  - SwiftUI `Color` extensions for iOS

The native repos already have parallel theme modules (`wallet-v2-android/theme/`, `wallet-v2-ios/RWSystemDesign`) — Phase 4 just makes them generated, not hand-maintained.

---

## Things deliberately out of scope

- **Real APIs / auth / state.** The canvas is mock-only, forever. Production logic lives in the native apps.
- **Tests.** This is a sandbox. Tests come when components graduate to `@rockwallet/ui`.
- **Multi-tenant theming.** RockWallet brand only.
- **i18n.** English only until a graduated component needs it.
