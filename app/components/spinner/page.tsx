import { PageHeader } from "@/components/app-shell/PageHeader";
import { Spinner } from "@/components/ui/spinner";

export default function SpinnerPage() {
  return (
    <>
      <PageHeader title="Spinner" subtitle="Animated loading indicator. Two sizes: large (44px) and small (24px)." />
      <main className="px-5 pb-8 space-y-8">
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">Large</h2>
          <div className="flex items-center gap-6">
            <Spinner size="large" />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">Small</h2>
          <div className="flex items-center gap-6">
            <Spinner size="small" />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">On card background</h2>
          <div className="flex items-center gap-6 rounded-xl bg-[var(--color-bg-card)] p-5">
            <Spinner size="large" />
            <Spinner size="small" />
          </div>
        </section>
      </main>
    </>
  );
}
