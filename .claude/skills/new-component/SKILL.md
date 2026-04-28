---
name: new-component
description: Use when the user wants to add a new Prometheus design system component to the rw-web-prod canvas. Triggers on phrases like "let's build X", "add an Alert/Toggle/Card component", "I want to build our next component", "create a new component for...". Forces a context-gathering + confirmation gate before any code is written, then builds following the established Button Large precedent with strict alphabetical placement in /components.
---

# New Prometheus component (rw-web-prod canvas)

The canvas (`/Users/fostan/rw-web-prod-v1`) is where Prometheus components are prototyped before graduating to `@rockwallet/ui`. Every new component must follow the precedent set by **Button Large** (commit `757956d`) so the patterns hold as the system grows.

## The Iron Rule

**No code, no Figma fetch, no scaffolding until you have:**

1. Gathered all available context from the user (push for it).
2. Restated your understanding back to them.
3. Received explicit confirmation ("yes", "ok", "confirm", "go").

Skipping any step wastes work. Even when the user gave you a Figma link, you do **not** have enough context. Ask.

## Step 1 — Demand context (your first reply)

Open with a context-gathering message. Ask for everything they can give:

- **Figma URL(s)** — required. Specific node ideal. Prometheus file is `vT4esHtsM9b4JdCy2q5Nex`; Icons file is `R94pMAkvOLPDbJZFSVOg8E`.
- **Component name** — exact Prometheus name (e.g. "Alert", "Toggle", "Avatar Stack").
- **Behavior** — what does it do? When and how does it respond to input?
- **Variants & states** — Default/Hover/Pressed/Disabled is the floor. What else? (Loading? Error? Selected? Read-only?)
- **Slots / props** — what's customizable: label, icon, leading/trailing content, children, secondary text?
- **Usage examples** — where in the flows is this used? What does it replace?
- **PRD / Notion / spec docs** — paste links or content.
- **Prometheus icon names** — if the component embeds icons, get the exact icon names (e.g. "Add_round", "Check_round").
- **Edge cases** — overflow, empty state, loading, async, accessibility considerations (ARIA roles, keyboard nav).

Frame it firmly:

> "Before I build, I need everything you can give me — the more context up front, the closer to 1:1 we land. Drop me: Figma link, component name, behavior, all states/variants, slots, where it's used, any PRD or doc, and any specific icons. The more, the better."

If they reply with only a Figma link: push back. Don't proceed.

## Step 2 — Fetch the Figma context yourself

Once they've provided context, use the figma MCP tools — these are non-negotiable, never plan a component without them:

- `mcp__plugin_figma_figma__get_design_context` — primary tool. Pass `disableCodeConnect: true` after the first call to skip the code-connect prompt.
- `mcp__plugin_figma_figma__get_variable_defs` — token names + values from Figma variables.
- `mcp__plugin_figma_figma__get_screenshot` — visual reference.

Read everything before continuing.

## Step 3 — Restate and confirm

Write back a structured summary in this exact shape:

> "Ok, I understand. The **{ComponentName}** is {1-sentence description}.
>
> **Variants:** {list}
> **States:** {list — drive natively via `:hover`/`:active`/`:disabled` unless explicitly state-driven}
> **Props (sketch):** `{name: type, ...}`
> **New tokens needed:** `--{component}-*` ({brief list})
> **Icons needed:** {names from Prometheus Icons file}
> **Used in:** {flows / context the user mentioned}
>
> Confirm?"

Then **STOP**. Wait for explicit confirmation. Do not write code.

## Step 4 — Plan, then build

If outside plan mode: write a plan file or transition to plan mode. Plan must include:

- Files to add / modify (see "Files" below).
- New `--<component>-*` tokens with values from Figma variables.
- Component shape: `cn()` + `Record<Variant, string>`.
- Preview page matrix.
- Verification steps.

Get plan approval, then implement.

## Files (the precedent — match it exactly)

**New:**
- `components/ui/<name>/<name>.tsx` — named export, extends the underlying HTML element's props (`ButtonHTMLAttributes`, `InputHTMLAttributes`, etc.) so consumers get all native attrs free.
- `components/ui/<name>/index.ts` — re-export.
- `components/icons/<IconName>.tsx` — for each new Prometheus icon used. Inline SVG, 24×24 viewBox, `currentColor`, `strokeWidth={1.5}`, `aria-hidden="true"`. Never import an entire icon library.
- `app/components/<name>/page.tsx` — preview page with variant × state × prop matrix. Use `PageHeader`. No `"use client"` unless required.

**Modified:**
- `styles/tokens.css` — extend the existing `@theme` block with `--<component>-*` tokens, scoped to the component (e.g. `--btn-*`, `--alert-*`). Don't pollute generic `--color-*` until the full Prometheus token extraction lands. Map directly from Figma's `Bg/...`, `Label/...`, `Border/...`, `Icon/...` variables.
- `app/components/page.tsx` — insert section at the correct alphabetical position (see "Alphabetical insertion" below).

## Component shape (mandatory)

```tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "text"; // adapt per component

export type ComponentProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: ReactNode;
};

const base = "..."; // shared styles, including font-[var(--font-prometheus)]
const variantClasses: Record<Variant, string> = {
  primary: cn("bg-[var(--xxx-primary-bg)] ...", "hover:...", "active:...", "disabled:..."),
  // ...
};

export function Component({ variant = "primary", className, ...rest }: ComponentProps) {
  return <button className={cn(base, variantClasses[variant], className)} {...rest} />;
}
```

**Hard rules:**
- States via `:hover`, `:active`, `:disabled`, `:focus-visible`, `[aria-*]`. **Never a `state` prop**.
- No hex literals — every color is a `var(--...)` token.
- Roboto / Prometheus typography via `font-[var(--font-prometheus)]`. Never font-family literals.
- Real semantic HTML element (`<button>`, `<input>`, `<dialog>`, etc.) — not a `<div>` with role attributes.
- Use `cn()` from `@/lib/cn`.
- Use lucide-react ONLY for chrome icons (BottomNav, etc.). Component-internal icons come from `components/icons/` extracted from the Prometheus Icons file.

## Alphabetical insertion in /components

**CRITICAL.** `app/components/page.tsx` lists components in alphabetical order by `heading`. When you add a new component, insert at the correct slot — never at the bottom.

Examples:
- Existing `["Button"]`, adding `Alert` → `["Alert", "Button"]`.
- Existing `["Alert", "Button"]`, adding `Card` → `["Alert", "Button", "Card"]`.
- Existing `["Alert", "Button"]`, adding `Avatar` → `["Alert", "Avatar", "Button"]`.

Same rule for entries within a section if a section ever has multiple components.

After editing, eyeball the resulting `sections` array — it must be sorted ascending by heading.

## Preview page shape

```tsx
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Component } from "@/components/ui/<name>";
// import any icons used

const variants = ["primary", "secondary", "text"] as const; // adapt

export default function ComponentPage() {
  return (
    <>
      <PageHeader title="<Pretty Name>" subtitle="Hover or press to see hover/pressed states." />
      <main className="px-5 pb-8 space-y-8">
        {variants.map((v) => (
          <section key={v} className="space-y-3">
            <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">{v}</h2>
            <div className="flex flex-wrap items-center gap-3">
              {/* Default + with-icon + disabled + disabled+icon at minimum */}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
```

## Step 5 — Verify before reporting done

1. `npm run build` — must pass with the new route prerendered (`/components/<name>` should appear in the route summary).
2. Visit `/components` — section appears in the **correct alphabetical slot**.
3. Visit `/components/<name>` — full preview matrix renders.
4. Cross-check against the Figma screenshot at 440px viewport. Note any deviations explicitly. Don't claim 1:1 unless you genuinely verified it.
5. If typography deviates (e.g. wrong weight, fallback font), fix before claiming done — see the Roboto wiring in `app/layout.tsx` for how Prometheus typography is loaded.

## Step 6 — Commit

Two commits if there are unrelated working-tree changes (don't bundle). Conventional message:

```
feat(components): add <Name> from Prometheus

<2-3 sentences on what was added, what tokens/icons were introduced,
and any deviation from 1:1 that's known.>
```

Don't push unless asked. If asked: `git push origin main`.

## Anti-patterns

| Anti-pattern | Why it's wrong |
|---|---|
| Building from a Figma link alone | You will miss interaction nuance. Always demand wider context. |
| Skipping the confirmation message | "It seemed clear" is the rationalization that produces wrong components. Always restate. |
| Adding a `state` prop mirroring Figma's variant frames | Browsers already model interaction state. A prop loses real interactivity. |
| Hex literals in component code | CLAUDE.md hard rule: tokens only. |
| Importing the whole Prometheus icon set | Extract only the icons you need into `components/icons/`. |
| Placing the new section at the bottom of `/components` | The list is alphabetical. Reorder if needed. |
| Claiming "1:1 with the design" without comparing screenshots | Don't make this claim unless you ran `get_screenshot` and compared. |
| Inventing icon SVG paths | Reference the Prometheus Icons file or trace from the Figma reference. |
| Loading a font you didn't actually wire | If the design uses a non-default font, wire it via `next/font/google` in `app/layout.tsx` and expose a token. Don't write `font-[Roboto,...]` and hope. |

## Reference: the Button Large precedent

The canonical example. Files to study:
- `components/ui/button/button.tsx` — component shape (cn + Record + native button)
- `app/components/button/page.tsx` — preview matrix
- `styles/tokens.css` — `--btn-*` block + `--font-prometheus` token
- `components/icons/AddRound.tsx` — icon shape
- `app/layout.tsx` — Roboto loaded via `next/font/google`, `--font-roboto` exposed

Commit: `757956d` — `feat(components): add Button Large from Prometheus`.

## Update this skill as patterns evolve

If you discover a better pattern while building (better state handling, better preview layout, better token namespacing) — update this skill in the same session, after the user has approved the new pattern in code. Skills are living documents.
