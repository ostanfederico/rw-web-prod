import { cn } from "@/lib/cn";

export type Holding = {
  name: string;
  symbol: string;
  price: string;
  change: string;
  positive: boolean;
  badgeColor: string;
};

const defaultHoldings: Holding[] = [
  { name: "Bitcoin", symbol: "BTC", price: "$62,450.00", change: "+3.24%", positive: true, badgeColor: "var(--coin-btc)" },
  { name: "Ethereum", symbol: "ETH", price: "$2,891.50", change: "+1.87%", positive: true, badgeColor: "var(--coin-eth)" },
  { name: "Solana", symbol: "SOL", price: "$142.30", change: "−2.41%", positive: false, badgeColor: "var(--coin-sol)" },
];

export type HomescreenWidgetProps = {
  holdings?: Holding[];
  className?: string;
};

export function HomescreenWidget({ holdings = defaultHoldings, className }: HomescreenWidgetProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)]",
        "bg-[var(--widget-bg)] border border-[var(--widget-border)]",
        className
      )}
    >
      <h2 className="px-4 pt-4 pb-3 text-sm font-semibold font-[var(--font-prometheus)] text-[var(--widget-header)] tracking-[0.1px]">
        Top Holdings
      </h2>
      <ul className="divide-y divide-[var(--widget-border)]">
        {holdings.map((h) => (
          <li key={h.symbol} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white font-[var(--font-prometheus)]"
                style={{ backgroundColor: h.badgeColor }}
                aria-hidden="true"
              >
                {h.symbol.slice(0, 2)}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium font-[var(--font-prometheus)] text-[var(--widget-label)] leading-5">
                  {h.name}
                </span>
                <span className="text-xs font-[var(--font-prometheus)] text-[var(--widget-sublabel)] leading-4">
                  {h.symbol}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium font-[var(--font-prometheus)] text-[var(--widget-label)] leading-5">
                {h.price}
              </span>
              <span
                className={cn(
                  "text-xs font-[var(--font-prometheus)] leading-4",
                  h.positive
                    ? "text-[var(--widget-positive)]"
                    : "text-[var(--widget-negative)]"
                )}
              >
                {h.change}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
