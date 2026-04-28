import { PageHeader } from "@/components/app-shell/PageHeader";
import { BitcoinSpinner } from "@/components/icons/BitcoinSpinner";
import { DogeSpinner } from "@/components/icons/DogeSpinner";

const tokens = [
  { label: "BTC",  component: <BitcoinSpinner size={96} /> },
  { label: "DOGE", component: <DogeSpinner size={96} /> },
];

export default function TokensPage() {
  return (
    <>
      <PageHeader title="Tokens" subtitle="Token logo animations." />
      <main className="px-5 pb-8">
        <div className="grid grid-cols-3 gap-4">
          {tokens.map(({ label, component }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-xl bg-[var(--color-bg-card)] p-4"
            >
              {component}
              <span className="text-xs font-medium text-[var(--color-fg-muted)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
