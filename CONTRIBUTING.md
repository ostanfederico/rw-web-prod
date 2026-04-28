# Contributing

Short version of [`docs/WORKFLOW.md`](./docs/WORKFLOW.md). Read that first if you're new.

## Branch naming

- `flow/<name>` — a screen flow
- `component/<name>` — a reusable UI piece
- `fix/<short-desc>` — a fix

## The loop

```
git checkout -b flow/<name>
# edit files…
git push -u origin flow/<name>
# open PR → wait for Vercel preview URL → install PWA on phone → iterate
# tag a teammate → merge → done
```

## Conventions

- Use CSS variables from `styles/tokens.css`, never hardcoded hex values.
- Use `cn()` from `@/lib/cn` to compose class names.
- Use icons from `lucide-react` — match the icon style already in `BottomNav`.
- Write `"use client"` only when you need browser APIs (state, refs, event handlers).
- Mocked data lives in `lib/mock/`. No real network calls.

## When a component is "ready"

Tag the PR with the label `ready-for-ds`. Federico will graduate it to `@rockwallet/ui` on npm.
