import { PageHeader } from "@/components/app-shell/PageHeader";
import { Checkbox } from "@/components/ui/checkbox";

const states = [
  { heading: "Unchecked", props: {} },
  { heading: "Checked", props: { defaultChecked: true } },
  { heading: "Disabled (unchecked)", props: { disabled: true } },
  { heading: "Disabled (checked)", props: { disabled: true, defaultChecked: true } },
  { heading: "Error", props: { error: true } },
] as const;

export default function CheckboxPage() {
  return (
    <>
      <PageHeader
        title="Checkbox"
        subtitle="Single opt-in. Click the box or the label to toggle. Space toggles when focused."
      />
      <main className="px-5 pb-8 space-y-8">
        {states.map((state) => (
          <section key={state.heading} className="space-y-3">
            <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
              {state.heading}
            </h2>
            <div className="flex flex-col gap-4">
              <Checkbox {...state.props} label="I agree to the terms" />
              <Checkbox {...state.props} aria-label="Accept terms" />
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
