import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type EntryPointProps = HTMLAttributes<HTMLDivElement> & {
  onCtaPress?: () => void;
};

export function EntryPoint({ onCtaPress, className, ...rest }: EntryPointProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[16px] px-4 py-4 flex flex-col gap-3",
        "bg-[var(--ep-bg)] backdrop-blur-[7px]",
        "shadow-[0px_2px_15px_-2px_rgba(0,0,0,0.25)]",
        className
      )}
      {...rest}
    >
      {/* Title + body — width constrained to leave room for card image */}
      <div className="flex flex-col gap-2 w-[204px]">
        <p className="font-[var(--font-display)] font-medium text-[14px] leading-[20px] tracking-[0.1px] text-[var(--ep-title)]">
          Crypto meets banking
        </p>
        <p className="font-[var(--font-prometheus)] text-[12px] leading-[16px] tracking-[0.4px] text-[var(--ep-body)]">
          Open a checking account with Cross River Bank and get more from your crypto.
        </p>
      </div>

      {/* CTA */}
      <div className="w-full flex items-center">
        <button
          type="button"
          onClick={onCtaPress}
          className={cn(
            "h-[44px] px-4 py-[6px] rounded-full shrink-0",
            "bg-[var(--ep-btn-bg)] border-[1.5px] border-[var(--ep-btn-border)]",
            "font-[var(--font-prometheus)] font-medium text-[15px] leading-[20px] tracking-[0.1px]",
            "text-[var(--ep-btn-label)] whitespace-nowrap",
            "active:bg-[var(--ep-btn-bg-pressed)]",
            "transition-colors select-none"
          )}
        >
          Open bank account
        </button>
      </div>

      {/* Credit card image — absolutely positioned over the right side */}
      <div
        className="absolute pointer-events-none overflow-hidden"
        style={{ height: "128.747px", left: "191px", top: "26px", width: "178.629px" }}
        aria-hidden="true"
      >
        <img
          alt=""
          src="/images/crb-card.png"
          className="absolute max-w-none"
          style={{ height: "117.61%", left: "-27.26%", top: "-7.35%", width: "155.41%" }}
        />
      </div>
    </div>
  );
}
