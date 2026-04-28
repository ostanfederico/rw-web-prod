import { PageHeader } from "@/components/app-shell/PageHeader";
import { EntryPoint } from "@/components/ui/entry-point";

export default function EntryPointPage() {
  return (
    <>
      <PageHeader
        title="Entry Point"
        subtitle="CRB promotional card. Press the button to see the active state."
      />
      <main className="px-5 pb-8 space-y-8">
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
            Default (Home screen context)
          </h2>
          {/* Gradient simulates the Home screen background the card sits on */}
          <div className="rounded-[16px] overflow-hidden bg-gradient-to-b from-[var(--color-primary-14)] to-[var(--color-primary-15)]">
            <EntryPoint />
          </div>
        </section>
      </main>
    </>
  );
}
