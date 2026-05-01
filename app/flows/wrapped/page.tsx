"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, Share2, FileText } from "lucide-react";
import { Confetti } from "@/components/ui/confetti";
import { wrappedData as d } from "@/lib/mock/wrapped";

const TOTAL = 10;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

// ─── Shared slide wrapper ──────────────────────────────────────────────────────

function Slide({
  fromVar,
  toVar,
  children,
}: {
  fromVar: string;
  toVar: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-screen h-full flex flex-col px-8 select-none overflow-hidden"
      style={{ background: `linear-gradient(145deg, var(${fromVar}) 0%, var(${toVar}) 100%)` }}
    >
      {children}
    </div>
  );
}

// ─── Slides ───────────────────────────────────────────────────────────────────

function SlideOpening({ showHint }: { showHint: boolean }) {
  return (
    <Slide fromVar="--wrapped-1-from" toVar="--wrapped-1-to">
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <span className="text-white/60 text-sm font-[var(--font-prometheus)] tracking-[0.2em] uppercase">
          RockWallet
        </span>
        <div className="space-y-2">
          <p className="text-white/70 text-xl font-[var(--font-prometheus)]">Your</p>
          <h1
            className="text-white leading-none font-[var(--font-display)]"
            style={{ fontSize: "clamp(4rem, 22vw, 6rem)", fontWeight: 900 }}
          >
            {d.year}
          </h1>
          <p
            className="text-white font-[var(--font-display)]"
            style={{ fontSize: "clamp(1.75rem, 9vw, 2.5rem)", fontWeight: 700 }}
          >
            Wrapped
          </p>
        </div>
        <p className="text-white/50 text-sm font-[var(--font-prometheus)] mt-4">
          Your year in crypto, one swipe at a time.
        </p>
      </div>

      {/* Swipe hint */}
      <div
        className="flex items-center justify-center gap-2 pb-24 transition-opacity duration-700"
        style={{ opacity: showHint ? 1 : 0 }}
      >
        <span className="text-white/60 text-sm font-[var(--font-prometheus)]">
          Swipe to begin
        </span>
        <span
          className="text-white/80"
          style={{ animation: "swipe-nudge 1.2s ease-in-out infinite" }}
        >
          →
        </span>
      </div>
    </Slide>
  );
}

function SlideVolume() {
  return (
    <Slide fromVar="--wrapped-2-from" toVar="--wrapped-2-to">
      <div className="flex-1 flex flex-col justify-center gap-4">
        <p className="text-white/70 text-2xl font-[var(--font-prometheus)]">
          This year, you moved
        </p>
        <p
          className="text-white font-[var(--font-display)] leading-none"
          style={{ fontSize: "clamp(3rem, 18vw, 5rem)", fontWeight: 900 }}
        >
          {fmt(d.totalVolume)}
        </p>
        <p className="text-white/70 text-2xl font-[var(--font-prometheus)]">
          in crypto.
        </p>
        <p className="text-white/40 text-base font-[var(--font-prometheus)] mt-4">
          Across {d.totalTxCount} transactions. Not bad.
        </p>
      </div>
    </Slide>
  );
}

function SlideActivity() {
  const acts = [
    { label: "Bought", count: d.activity.buys, color: "var(--color-success)" },
    { label: "Sold", count: d.activity.sells, color: "var(--color-danger)" },
    { label: "Swapped", count: d.activity.swaps, color: "var(--color-info)" },
    { label: "Sent", count: d.activity.sends, color: "var(--color-warning)" },
    { label: "Received", count: d.activity.receives, color: "var(--color-primary-7)" },
  ];
  const max = Math.max(...acts.map((a) => a.count));

  return (
    <Slide fromVar="--wrapped-3-from" toVar="--wrapped-3-to">
      <div className="flex-1 flex flex-col justify-center gap-8">
        <p
          className="text-white font-[var(--font-display)]"
          style={{ fontSize: "clamp(1.75rem, 9vw, 2.5rem)", fontWeight: 800 }}
        >
          Here's how you did it.
        </p>
        <div className="flex flex-col gap-4">
          {acts.map(({ label, count, color }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-white/70 font-[var(--font-prometheus)] text-sm w-20 shrink-0">
                {label}
              </span>
              <div className="flex-1 h-2 rounded-full bg-white/20">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(count / max) * 100}%`, background: color }}
                />
              </div>
              <span className="text-white font-[var(--font-prometheus)] font-bold text-sm w-6 text-right shrink-0">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function SlideTopTokens() {
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <Slide fromVar="--wrapped-4-from" toVar="--wrapped-4-to">
      <div className="flex-1 flex flex-col justify-center gap-8">
        <p
          className="text-white font-[var(--font-display)]"
          style={{ fontSize: "clamp(1.75rem, 9vw, 2.5rem)", fontWeight: 800 }}
        >
          Your top tokens.
        </p>
        <div className="flex flex-col gap-5">
          {d.topTokens.map((token, i) => (
            <div key={token.symbol} className="flex items-center gap-4">
              <span className="text-3xl">{medals[i]}</span>
              <div className="flex-1">
                <p className="text-white font-[var(--font-display)] font-bold text-xl">
                  {token.name}
                </p>
                <p className="text-white/60 font-[var(--font-prometheus)] text-sm">
                  {token.symbol}
                </p>
              </div>
              <p className="text-white font-[var(--font-display)] font-bold text-lg">
                {fmt(token.volume)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function SlideFavourite() {
  return (
    <Slide fromVar="--wrapped-5-from" toVar="--wrapped-5-to">
      <div className="flex-1 flex flex-col justify-center gap-4">
        <p className="text-white/70 text-xl font-[var(--font-prometheus)]">
          At heart, you're a...
        </p>
        <p
          className="text-white font-[var(--font-display)] leading-none"
          style={{ fontSize: "clamp(3.5rem, 20vw, 5.5rem)", fontWeight: 900 }}
        >
          {d.favouriteActivity.toUpperCase()}
        </p>
        <p className="text-white/60 text-base font-[var(--font-prometheus)] mt-4">
          {d.favouriteActivityPct}% of your transactions were purchases.
        </p>
      </div>
    </Slide>
  );
}

function SlideBiggest() {
  return (
    <Slide fromVar="--wrapped-6-from" toVar="--wrapped-6-to">
      <div className="flex-1 flex flex-col justify-center gap-4">
        <p className="text-white/70 text-xl font-[var(--font-prometheus)]">
          Your biggest move this year
        </p>
        <p
          className="text-white font-[var(--font-display)] leading-none"
          style={{ fontSize: "clamp(3rem, 17vw, 4.5rem)", fontWeight: 900 }}
        >
          {fmt(d.biggestTx.amount)}
        </p>
        <p
          className="text-white font-[var(--font-display)]"
          style={{ fontSize: "clamp(1.25rem, 7vw, 1.75rem)", fontWeight: 700 }}
        >
          {d.biggestTx.token} {d.biggestTx.type}
        </p>
        <p className="text-white/50 text-base font-[var(--font-prometheus)]">
          on {d.biggestTx.date}
        </p>
      </div>
    </Slide>
  );
}

function SlidePersonality() {
  return (
    <Slide fromVar="--wrapped-7-from" toVar="--wrapped-7-to">
      <div className="flex-1 flex flex-col justify-center gap-6">
        <p className="text-white/70 text-xl font-[var(--font-prometheus)]">You are...</p>
        <div>
          <p className="text-white/50 text-lg font-[var(--font-display)] font-bold">The</p>
          <p
            className="text-white font-[var(--font-display)] leading-none"
            style={{ fontSize: "clamp(2.75rem, 15vw, 4rem)", fontWeight: 900 }}
          >
            {d.personality.title.replace("The ", "")}
          </p>
        </div>
        <p className="text-white/70 text-base font-[var(--font-prometheus)] leading-relaxed">
          {d.personality.description}
        </p>
      </div>
    </Slide>
  );
}

function SlideTopPct() {
  return (
    <Slide fromVar="--wrapped-8-from" toVar="--wrapped-8-to">
      <div className="flex-1 flex flex-col justify-center gap-4">
        <p className="text-white/70 text-xl font-[var(--font-prometheus)]">
          You're in the top
        </p>
        <p
          className="text-white font-[var(--font-display)] leading-none"
          style={{ fontSize: "clamp(5rem, 30vw, 8rem)", fontWeight: 900 }}
        >
          {d.topPct}%
        </p>
        <p className="text-white/70 text-xl font-[var(--font-prometheus)]">
          of {d.topToken} traders
          <br />
          on RockWallet.
        </p>
      </div>
    </Slide>
  );
}

function SlideActiveMonth() {
  return (
    <Slide fromVar="--wrapped-9-from" toVar="--wrapped-9-to">
      <div className="flex-1 flex flex-col justify-center gap-8">
        <div className="space-y-2">
          <p className="text-white/70 text-xl font-[var(--font-prometheus)]">
            You were most active in
          </p>
          <p
            className="text-white font-[var(--font-display)] leading-none"
            style={{ fontSize: "clamp(2.5rem, 14vw, 3.75rem)", fontWeight: 900 }}
          >
            {d.mostActiveMonth}.
          </p>
        </div>
        {/* Month strip */}
        <div className="flex gap-1.5 flex-wrap">
          {MONTHS.map((m, i) => {
            const active = i === d.mostActiveMonthIndex;
            return (
              <div
                key={m}
                className="flex flex-col items-center gap-1"
                style={{ width: "calc(100% / 6 - 6px)" }}
              >
                <div
                  className="w-full rounded-md transition-all"
                  style={{
                    height: active ? "48px" : "20px",
                    background: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)",
                  }}
                />
                <span
                  className="font-[var(--font-prometheus)] text-[10px]"
                  style={{ color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}
                >
                  {m}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Slide>
  );
}

function SlideShare({ onShare }: { onShare: () => void }) {
  return (
    <Slide fromVar="--wrapped-10-from" toVar="--wrapped-10-to">
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div className="space-y-1">
          <p className="text-white/60 font-[var(--font-prometheus)] text-sm tracking-widest uppercase">
            {d.year} at a glance
          </p>
          <p
            className="text-white font-[var(--font-display)]"
            style={{ fontSize: "clamp(1.75rem, 9vw, 2.5rem)", fontWeight: 800 }}
          >
            Your Year in Crypto
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Volume moved", value: fmt(d.totalVolume) },
            { label: "Transactions", value: String(d.totalTxCount) },
            { label: "Top token", value: d.topToken },
            { label: "Top % traders", value: `Top ${d.topPct}%` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl p-4"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <p className="text-white/60 font-[var(--font-prometheus)] text-xs">{label}</p>
              <p className="text-white font-[var(--font-display)] font-bold text-lg leading-tight mt-1">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-2">
          <Confetti label="Celebrate 🎉" />
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-medium text-[15px] font-[var(--font-prometheus)] transition-colors"
            style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
          >
            <Share2 size={18} />
            Share my Wrapped
          </button>
        </div>
      </div>
    </Slide>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SOCIAL_OPTIONS = [
  { label: "Instagram", colorVar: "--social-instagram", symbol: "IG" },
  { label: "X",         colorVar: "--social-x",         symbol: "𝕏"  },
  { label: "WhatsApp",  colorVar: "--social-whatsapp",  symbol: "W"  },
  { label: "Facebook",  colorVar: "--social-facebook",  symbol: "f"  },
  { label: "TikTok",    colorVar: "--social-tiktok",    symbol: "♪"  },
] as const;

export default function WrappedPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const [showHint, setShowHint] = useState(true);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3200);
    return () => clearTimeout(t);
  }, []);

  // Lock document scroll for the lifetime of this flow
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => { html.style.overflow = prev; };
  }, []);

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, TOTAL - 1)), []);
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (showShareSheet) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (showShareSheet || touchStartX.current === null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    // Resist at the edges so it doesn't feel like it goes nowhere
    if ((current === 0 && delta > 0) || (current === TOTAL - 1 && delta < 0)) {
      setDragOffset(delta * 0.2);
    } else {
      setDragOffset(delta);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (showShareSheet) return;
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    setDragOffset(0);
    if (delta > 50) next();
    else if (delta < -50) prev();
    touchStartX.current = null;
  };

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    if (e.clientX > window.innerWidth / 2) next();
    else prev();
  };

  const handleShare = () => setShowShareSheet(true);

  const handleSocialShare = (platform: string) => {
    setShowShareSheet(false);
    showToast(`Shared to ${platform} ✓`);
  };

  const handleExportPdf = () => {
    setShowShareSheet(false);
    showToast("PDF exported ✓");
  };

  const slides = [
    <SlideOpening key="opening" showHint={showHint} />,
    <SlideVolume key="volume" />,
    <SlideActivity key="activity" />,
    <SlideTopTokens key="tokens" />,
    <SlideFavourite key="favourite" />,
    <SlideBiggest key="biggest" />,
    <SlidePersonality key="personality" />,
    <SlideTopPct key="top-pct" />,
    <SlideActiveMonth key="active-month" />,
    <SlideShare key="share" onShare={handleShare} />,
  ];

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden bg-black"
      style={{ touchAction: "none" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* Slide track */}
      <div
        className="flex h-full"
        style={{
          width: `${TOTAL * 100}vw`,
          transform: `translateX(calc(-${current} * 100vw + ${dragOffset}px))`,
          transition: dragOffset !== 0 ? "none" : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {slides}
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={() => router.push("/flows")}
        className="absolute right-4 z-50 flex items-center justify-center w-11 h-11 rounded-full"
        style={{
          top: "calc(env(safe-area-inset-top) + 12px)",
          background: "rgba(0,0,0,0.35)",
        }}
        aria-label="Exit Wrapped"
      >
        <X size={18} color="rgba(255,255,255,0.8)" />
      </button>

      {/* Progress dots — translate3d forces a GPU compositing layer so iOS
          Safari doesn't drop them during active touch events */}
      <div
        className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-1.5 z-[65] pointer-events-none"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === current ? "24px" : "6px",
              background: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[65] px-5 py-3 rounded-full text-sm font-[var(--font-prometheus)] pointer-events-none whitespace-nowrap"
          style={{ background: "rgba(0,0,0,0.75)", color: "rgba(255,255,255,0.95)" }}
        >
          {toast}
        </div>
      )}

      {/* Share sheet backdrop */}
      <div
        className="fixed inset-0 z-[62] transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.6)",
          opacity: showShareSheet ? 1 : 0,
          pointerEvents: showShareSheet ? "auto" : "none",
        }}
        onClick={() => setShowShareSheet(false)}
      />

      {/* Share sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[63] mx-auto w-full max-w-[440px] rounded-t-3xl overflow-hidden"
        style={{
          background: "var(--color-bg-raised)",
          transform: showShareSheet ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--color-border-strong)" }} />
        </div>

        <div className="px-6 pt-3 pb-6 space-y-6">
          <p className="text-center font-semibold font-[var(--font-prometheus)]" style={{ color: "var(--color-fg)" }}>
            Share your {d.year} Wrapped
          </p>

          {/* Social icons */}
          <div className="flex justify-between">
            {SOCIAL_OPTIONS.map(({ label, colorVar, symbol }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleSocialShare(label)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ background: `var(${colorVar})` }}
                >
                  {symbol}
                </div>
                <span className="text-[11px] font-[var(--font-prometheus)]" style={{ color: "var(--color-fg-subtle)" }}>
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)" }} />

          {/* Export PDF */}
          <button
            type="button"
            onClick={handleExportPdf}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-colors"
            style={{ background: "var(--color-bg-card)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "var(--color-primary-14)" }}
            >
              <FileText size={20} color="var(--color-primary-7)" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold font-[var(--font-prometheus)]" style={{ color: "var(--color-fg)" }}>
                Export as PDF
              </p>
              <p className="text-xs font-[var(--font-prometheus)]" style={{ color: "var(--color-fg-subtle)" }}>
                Save a summary to your device
              </p>
            </div>
          </button>

          {/* Cancel */}
          <button
            type="button"
            onClick={() => setShowShareSheet(false)}
            className="w-full py-3.5 rounded-2xl text-sm font-semibold font-[var(--font-prometheus)] transition-colors"
            style={{ background: "var(--color-bg-card)", color: "var(--color-fg-muted)" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
