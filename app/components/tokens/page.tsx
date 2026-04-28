import { PageHeader } from "@/components/app-shell/PageHeader";
import { TokenIcon } from "@/components/icons/TokenIcon";

const tokens = [
  "BTC", "ETH", "USDC", "USDT", "XRP", "SOL",
  "BNB", "ADA", "AVAX", "DOGE", "SHIB", "DOT",
  "MATIC", "LINK", "UNI", "LTC", "BCH", "ALGO",
  "XLM", "PEPE", "DAI", "COMP", "MKR", "ZRX",
  "BAT", "ENJ", "XMR", "XNO", "LRC", "ONDO",
  "WLD", "DINO", "PYUSD", "FDUSD", "MNEE", "ONT",
  "BSV", "EOS", "DASH",
];

export default function TokensPage() {
  return (
    <>
      <PageHeader title="Tokens" subtitle={`${tokens.length} token logos from the design system.`} />
      <main className="px-5 pb-8">
        <div className="grid grid-cols-4 gap-4">
          {tokens.map((symbol) => (
            <div
              key={symbol}
              className="flex flex-col items-center gap-2 rounded-xl bg-[var(--color-bg-card)] p-4"
            >
              <TokenIcon symbol={symbol} size={64} />
              <span className="text-xs font-medium text-[var(--color-fg-muted)]">
                {symbol}
              </span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
