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
            Default
          </h2>
          <EntryPoint />
        </section>
      </main>
    </>
  );
}
