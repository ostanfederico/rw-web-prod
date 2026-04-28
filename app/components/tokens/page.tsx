import { PageHeader } from "@/components/app-shell/PageHeader";
import { BitcoinSpinner } from "@/components/icons/BitcoinSpinner";

export default function TokensPage() {
  return (
    <>
      <PageHeader
        title="Tokens"
        subtitle="Token logo animations."
      />
      <main className="px-5 pb-8 space-y-8">
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
            Bitcoin
          </h2>
          <div className="flex items-center justify-center rounded-xl bg-[var(--color-bg-card)] p-10">
            <BitcoinSpinner size={120} />
          </div>
        </section>
      </main>
    </>
  );
}
