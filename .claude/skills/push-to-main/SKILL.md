---
name: push-to-main
description: Use when the user wants to push changes to main. Runs a mandatory pre-push checklist — local verification gate, build pass, duplicate check, git hygiene — before pushing. Required because main IS production for this PWA.
---

# Push to Main — Pre-push checklist

This canvas deploys to Vercel on every push to `main`. That URL is what users install as a PWA on their phone. **Main is production.** This skill runs a mandatory gate before every push.

## The Iron Rule

**No push until all five gates pass.** Never skip a gate. Never push if a gate is uncertain.

---

## Gate 1 — Human verification (mandatory, cannot be automated)

Ask the user explicitly before running anything:

> "Have you opened the local dev server (`npm run dev`) and verified your changes look correct on mobile? This push goes live on the PWA immediately."

If the answer is no or unclear: **stop**. Tell them to run `npm run dev`, open it on their phone or in DevTools mobile viewport, and come back.

Only proceed when they confirm yes.

---

## Gate 2 — No uncommitted work

Run:
```bash
git status
```

- If there are unstaged or untracked files that look intentional: stage and commit them first (ask the user what to include).
- If there are untracked files that are gitignored noise (`.DS_Store`, cache): ignore.
- Working tree must be clean (or only noise) before pushing.

---

## Gate 3 — Build passes

Run:
```bash
npm run build
```

- Must complete with zero errors.
- All routes in `app/` must appear in the prerender output (check for `○` or `●` markers for static routes).
- If the build fails: stop, fix, do not push.

TypeScript errors caught here are blocking. Do not proceed with TS errors.

---

## Gate 4 — Duplicate / hygiene check

Scan `components/ui/` and `app/components/` together:

1. **No ad-hoc components outside `components/ui/`** — if a reusable component was built inline in a page instead of in `components/ui/<name>/`, flag it.
2. **No hex literals** — `grep -r '#[0-9a-fA-F]\{3,6\}' components/ app/` should return nothing (tokens only).
3. **No lucide-react inside `components/ui/`** — `grep -r 'lucide-react' components/ui/` should return nothing.
4. **No hardcoded real URLs or API keys** — this is a mock-only canvas.
5. **Icons in `components/ui/` must import from `components/icons/`**, not from an npm package.

Report any violations and fix before proceeding.

---

## Gate 5 — Commit message quality

Run `git log --oneline -5` and check the most recent commit(s) being pushed:

- Must follow conventional commits: `feat(...)`, `fix(...)`, `docs(...)`, `chore(...)`.
- No WIP, no "asdfasdf", no "fix fix fix".
- If the message is bad: `git commit --amend` with a proper message before pushing.

---

## Push

Once all five gates pass:

```bash
git push origin main
```

Then confirm:
> "Pushed. Vercel will deploy in ~30 seconds. URL: https://rw-web-prod-federico-ostan-bazans-projects.vercel.app"

---

## Anti-patterns

| Anti-pattern | Why it's wrong |
|---|---|
| Pushing without asking Gate 1 | The user may not have tested on mobile viewport at all. |
| Skipping the build check | Prerender failures cause 404s at the edge — invisible until someone visits the page. |
| Pushing with TS errors | They will show up as broken flows on the PWA. |
| Bypassing hex / lucide checks | These are design system regressions that accumulate silently. |
| Amending a published commit | Only amend if the commit hasn't been pushed yet. If it has, use a new fixup commit. |
