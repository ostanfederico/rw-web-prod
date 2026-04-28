# Team workflow

This guide is for **PMs and designers** who want to use the Product Whiteboard to prototype flows. It assumes you've used GitHub before but not necessarily Next.js or React.

---

## The big idea

You don't need to run anything locally. Push a branch → Vercel automatically builds a preview URL → a bot posts that URL on the GitHub PR → scan its QR code on your phone → install the PWA → iterate.

```
your branch  ──►  Vercel preview URL  ──►  QR on phone  ──►  install PWA
```

When the prototype is ready, open a PR. Once it's merged to `main`, production updates within ~60 seconds.

---

## One-time setup

### Install the tools you need

1. **GitHub Desktop** (or the `gh` CLI) — for branching and pushing without using the terminal.
2. **VS Code** or **Cursor** — to edit files.
3. (Optional) **Node 24** + `npm install` if you want to preview locally.

### Get access

Ask Federico to add you to:
- The GitHub repo: <https://github.com/ostanfederico/rw-web-prod>
- The Vercel project: <https://vercel.com/federico-ostan-bazans-projects/rw-web-prod>

---

## The loop (every change)

### 1. Make a branch

```
git checkout main
git pull
git checkout -b flow/onboarding-redesign
```

Branch naming:
- `flow/<name>` — a screen flow you're prototyping
- `component/<name>` — a single reusable UI piece
- `fix/<short-desc>` — a fix to existing canvas content

### 2. Edit files

For a new flow:
- Make a folder: `app/flows/onboarding-redesign/`
- Inside, create `page.tsx` (this becomes `/flows/onboarding-redesign` in the app)
- Use existing components from `components/` and Tailwind classes for styling

For a new component:
- Make a folder: `components/ui/<your-component>/`
- Add a preview at `app/components/<your-component>/page.tsx` so it shows in the Components tab

> **Don't know the code?** Ask Claude / Cursor to scaffold it for you. Reference an existing component or flow as the template.

### 3. Push and open a PR

```
git add .
git commit -m "Add onboarding redesign v1"
git push -u origin flow/onboarding-redesign
```

GitHub will print a URL. Click it → "Compare & pull request" → fill in title → "Create pull request."

### 4. Get a preview URL

Within ~60 seconds, the Vercel bot comments on your PR with a preview URL like:

> 🔍 Preview: `rw-web-prod-git-flow-onboarding-redesign-xxx.vercel.app`

Click the URL on your phone (or scan the QR on Vercel's dashboard) → tap Share → **Add to Home Screen** → tap the icon to launch in fullscreen.

### 5. Iterate

Each new push to the same branch updates the preview URL automatically. No need to reinstall on your phone — just close and reopen.

### 6. Get a review and merge

Tag a teammate on the PR. Once approved, click **Merge pull request**. Production updates automatically.

---

## Adding a new flow — step by step

1. Create folder `app/flows/<your-flow>/`
2. Add `page.tsx`:

```tsx
import { PageHeader } from "@/components/app-shell/PageHeader";

export default function MyFlowPage() {
  return (
    <>
      <PageHeader title="My flow" subtitle="What this flow proves." />
      <main className="px-5 pb-8">
        {/* your screens here */}
      </main>
    </>
  );
}
```

3. Push, open PR, get preview URL.

To make the flow appear in the **Flows** tab list, edit `app/flows/page.tsx` and add a link to it.

---

## Adding a new component

1. Create `components/ui/<your-component>/index.tsx`
2. Add a preview at `app/components/<your-component>/page.tsx`
3. When the component is solid (visual + interaction settled), tag the PR with the label `ready-for-ds`. Federico will graduate it to the `@rockwallet/ui` repo.

---

## Design tokens

All colors, spacing, type sizes live in `styles/tokens.css` as CSS variables. Don't hardcode hex values in components. If a token is missing, add it to `tokens.css` and reference [the Prometheus DS](https://www.figma.com/design/vT4esHtsM9b4JdCy2q5Nex/Prometheus-Design-System) for the right value.

Example:

```tsx
// good
<div className="bg-[var(--color-bg-card)]">…</div>

// bad
<div className="bg-[#243a35]">…</div>
```

---

## Frequently confusing things

**Q: Why does my preview URL ask for a password?**
A: The canvas is internal — both preview and production are password-gated. Ask Federico for the shared password.

**Q: My change isn't showing up.**
A: Make sure you pushed (`git push`). Then wait ~60s for Vercel to rebuild. Hard-refresh on your phone (close-and-reopen the installed PWA, or use private mode in Safari).

**Q: I broke something.**
A: Don't worry. Open a PR anyway and ask for help in the review. Or revert by deleting the branch and starting over — `main` is never affected by branch work.

**Q: Where do real APIs live?**
A: They don't. This canvas is mocked-data only. Anything that pretends to be a network call should live in `lib/mock/`.
