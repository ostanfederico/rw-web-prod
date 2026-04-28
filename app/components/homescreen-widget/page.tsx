import { PageHeader } from "@/components/app-shell/PageHeader";
import { HomescreenWidget } from "@/components/ui/homescreen-widget";
import type { Holding } from "@/components/ui/homescreen-widget";

const allPositive: Holding[] = [
  { name: "Bitcoin", symbol: "BTC", price: "$62,450.00", change: "+3.24%", positive: true, badgeColor: "var(--coin-btc)" },
  { name: "Ethereum", symbol: "ETH", price: "$2,891.50", change: "+1.87%", positive: true, badgeColor: "var(--coin-eth)" },
  { name: "Solana", symbol: "SOL", price: "$142.30", change: "+0.56%", positive: true, badgeColor: "var(--coin-sol)" },
];

const mixedPerformance: Holding[] = [
  { name: "Bitcoin", symbol: "BTC", price: "$62,450.00", change: "+3.24%", positive: true, badgeColor: "var(--coin-btc)" },
  { name: "Ethereum", symbol: "ETH", price: "$2,891.50", change: "+1.87%", positive: true, badgeColor: "var(--coin-eth)" },
  { name: "Solana", symbol: "SOL", price: "$142.30", change: "−2.41%", positive: false, badgeColor: "var(--coin-sol)" },
];

const allNegative: Holding[] = [
  { name: "Bitcoin", symbol: "BTC", price: "$58,200.00", change: "−4.10%", positive: false, badgeColor: "var(--coin-btc)" },
  { name: "Ethereum", symbol: "ETH", price: "$2,630.00", change: "−2.93%", positive: false, badgeColor: "var(--coin-eth)" },
  { name: "Solana", symbol: "SOL", price: "$118.75", change: "−6.87%", positive: false, badgeColor: "var(--coin-sol)" },
];

export default function HomescreenWidgetPage() {
  return (
    <>
      <PageHeader
        title="Homescreen Widget"
        subtitle="Top 3 holdings card. Green = positive change, red = negative."
      />
      <main className="px-5 pb-8 space-y-8">
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
            Mixed (default)
          </h2>
          <HomescreenWidget holdings={mixedPerformance} />
        </section>

        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
            All positive
          </h2>
          <HomescreenWidget holdings={allPositive} />
        </section>

        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
            All negative
          </h2>
          <HomescreenWidget holdings={allNegative} />
        </section>
      </main>
    </>
  );
}
