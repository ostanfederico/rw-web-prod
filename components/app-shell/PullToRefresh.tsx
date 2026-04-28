"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";

const TRIGGER = 70;
const MAX_PULL = 120;

export function PullToRefresh({ children }: { children: ReactNode }) {
  const startY = useRef<number | null>(null);
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    function atTop() {
      return (window.scrollY || document.documentElement.scrollTop) <= 0;
    }

    function onTouchStart(e: TouchEvent) {
      if (refreshing) return;
      if (!atTop()) {
        startY.current = null;
        return;
      }
      startY.current = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      if (refreshing || startY.current === null) return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta <= 0) {
        setPull(0);
        return;
      }
      const damped = Math.min(MAX_PULL, delta * 0.5);
      setPull(damped);
    }

    function onTouchEnd() {
      if (refreshing) return;
      if (pull >= TRIGGER) {
        setRefreshing(true);
        setPull(TRIGGER);
        window.location.reload();
        return;
      }
      setPull(0);
      startY.current = null;
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [pull, refreshing]);

  const armed = pull >= TRIGGER;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 mx-auto flex max-w-[440px] items-end justify-center"
        style={{
          height: pull,
          paddingTop: "env(safe-area-inset-top)",
          transition: refreshing || pull === 0 ? "height 200ms ease" : "none",
        }}
      >
        {pull > 12 && (
          <div className="mb-2 flex items-center gap-2 rounded-full bg-[var(--color-bg-card)] px-3 py-1.5 text-xs text-[var(--color-fg-muted)] shadow">
            <RefreshCw
              size={14}
              className={cn(
                "transition-transform",
                refreshing && "animate-spin",
                !refreshing && armed && "rotate-180"
              )}
            />
            <span>{refreshing ? "Refreshing" : armed ? "Release to refresh" : "Pull to refresh"}</span>
          </div>
        )}
      </div>
      <div
        style={{
          transform: `translateY(${pull}px)`,
          transition: refreshing || pull === 0 ? "transform 200ms ease" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
