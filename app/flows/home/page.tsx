import { Bell, ChevronRight, X, Plus } from "lucide-react";

export default function HomeFlow() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)]">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-b from-[var(--color-primary-14)] to-[var(--color-primary-15)] px-5 pt-4 pb-10">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Bell size={22} className="text-[var(--color-fg-muted)]" aria-hidden />
          <span className="bg-[var(--color-bg-card)] text-[var(--color-fg)] text-xs font-medium px-3 py-1.5 rounded-full">
            Get $100
          </span>
        </div>

        {/* Balance */}
        <div className="mt-7">
          <p className="text-sm text-[var(--color-fg-muted)]">Available</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span
              className="text-[2.625rem] leading-tight font-medium text-[var(--color-fg)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              $533.23
            </span>
            <ChevronRight
              size={22}
              className="text-[var(--color-fg-muted)] mt-1 shrink-0"
              aria-hidden
            />
          </div>
          <button className="mt-2 flex items-center gap-0.5 text-sm text-[var(--color-primary-7)]">
            $500.00 credit line
            <ChevronRight size={14} aria-hidden />
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col gap-5 px-4 pt-4">
        {/* Account card */}
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-xl)] px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-fg-muted)]">Bitcoin Wallet</span>
            <ChevronRight size={16} className="text-[var(--color-fg-subtle)]" aria-hidden />
          </div>
          <p
            className="mt-1 text-2xl font-medium text-[var(--color-fg)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            $533.23
          </p>
          <p className="mt-0.5 text-xs text-[var(--color-fg-subtle)]">Primary wallet</p>
        </div>

        {/* Promo carousel */}
        <div>
          {/* Cards */}
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 scrollbar-hide -mx-4 px-4">
            {/* Card 1 — mint */}
            <div
              className="relative shrink-0 snap-start rounded-[var(--radius-xl)] p-4 flex gap-3"
              style={{
                width: "calc(100% - 48px)",
                background: "var(--color-primary-7)",
              }}
            >
              <button
                className="absolute top-3 right-3 text-[var(--color-primary-14)] opacity-60"
                aria-label="Dismiss"
              >
                <X size={16} aria-hidden />
              </button>
              <div className="flex-1 pr-2">
                <p
                  className="text-sm font-medium leading-snug text-[var(--color-primary-14)]"
                  style={{ fontFamily: "var(--font-prometheus)" }}
                >
                  Welcome to RockWallet! Earn rewards, protect your assets, and more
                </p>
                <button className="mt-2 flex items-center gap-0.5 text-xs font-medium text-[var(--color-primary-14)]">
                  See your benefits
                  <ChevronRight size={12} aria-hidden />
                </button>
              </div>
              <div
                className="shrink-0 w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center self-center"
                style={{ background: "var(--color-primary-10)" }}
              >
                <Plus size={20} className="text-white" aria-hidden />
              </div>
            </div>

            {/* Card 2 — yellow peek */}
            <div
              className="shrink-0 snap-start rounded-[var(--radius-xl)] p-4 flex flex-col justify-between"
              style={{
                width: "calc(100% - 48px)",
                background: "var(--color-warning)",
                opacity: 0.85,
              }}
            >
              <p
                className="text-sm font-medium leading-snug text-[var(--color-primary-15)]"
                style={{ fontFamily: "var(--font-prometheus)" }}
              >
                Refer a friend and earn $25 in Bitcoin
              </p>
              <button className="mt-2 self-start flex items-center gap-0.5 text-xs font-medium text-[var(--color-primary-15)]">
                Share your link
                <ChevronRight size={12} aria-hidden />
              </button>
            </div>

            {/* Card 3 — info */}
            <div
              className="shrink-0 snap-start rounded-[var(--radius-xl)] p-4 flex flex-col justify-between"
              style={{
                width: "calc(100% - 48px)",
                background: "var(--color-info)",
                opacity: 0.85,
              }}
            >
              <p
                className="text-sm font-medium leading-snug text-[var(--color-primary-15)]"
                style={{ fontFamily: "var(--font-prometheus)" }}
              >
                Turn on push notifications to get real-time alerts
              </p>
              <button className="mt-2 self-start flex items-center gap-0.5 text-xs font-medium text-[var(--color-primary-15)]">
                Enable now
                <ChevronRight size={12} aria-hidden />
              </button>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: i === 0 ? "16px" : "6px",
                  height: "6px",
                  background:
                    i === 0
                      ? "var(--color-primary-7)"
                      : "var(--color-fg-disabled)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Financial tools */}
        <div className="pb-4">
          <p className="text-base font-medium text-[var(--color-fg)] mb-3">
            Financial tools
          </p>
          <div className="flex gap-2 flex-wrap">
            {["Buy Crypto", "Rewards", "Direct Deposit", "Send Money"].map((label) => (
              <button
                key={label}
                className="bg-[var(--color-bg-card)] text-[var(--color-fg)] text-sm px-4 py-2 rounded-[var(--radius-pill)] border border-[var(--color-border)]"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
