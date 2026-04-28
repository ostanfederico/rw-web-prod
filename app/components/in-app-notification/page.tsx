"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/ui/button";
import { InAppNotification } from "@/components/ui/in-app-notification";
import type { NotifState, NotifKind } from "@/components/ui/in-app-notification";
import { cn } from "@/lib/cn";

const STATES: NotifState[] = ["default", "error", "warning"];
const KINDS: NotifKind[] = ["system", "user"];

const STATE_LABELS: Record<NotifState, string> = {
  default: "Default",
  error: "Error",
  warning: "Warning",
};

const KIND_LABELS: Record<NotifKind, string> = {
  system: "System",
  user: "User",
};

// Auto-dismiss after 4 seconds — standard UX for in-app banners
const AUTO_DISMISS_MS = 4000;

export default function InAppNotificationPage() {
  const [demoKind, setDemoKind] = useState<NotifKind>("system");
  const [demoState, setDemoState] = useState<NotifState>("default");
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Portal requires document.body — only available client-side
  useEffect(() => setMounted(true), []);

  const dismiss = useCallback(() => {
    setVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const trigger = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
  }, []);

  // Clear timer on unmount
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <>
      {/* Portal renders directly into document.body, escaping PullToRefresh's transform */}
      {mounted && createPortal(
        <div
          className={cn(
            "fixed left-0 right-0 z-50 max-w-[440px] mx-auto",
            "transition-transform duration-300 ease-out",
            visible ? "translate-y-0" : "-translate-y-full"
          )}
          style={{ top: "env(safe-area-inset-top)" }}
        >
          <InAppNotification
            state={demoState}
            kind={demoKind}
            onDismiss={dismiss}
            onCtaClick={dismiss}
          />
        </div>,
        document.body
      )}

      <PageHeader
        title="In-App Notification"
        subtitle="Temporary top-of-screen banner. Select a variant, then tap 'Test it out'."
      />

      <main className="px-5 pb-8 space-y-8">
        {KINDS.map((kind) => (
          <section key={kind} className="space-y-3">
            <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
              {KIND_LABELS[kind]} notification
            </h2>
            <div className="space-y-3">
              {STATES.map((state) => {
                const isSelected = demoKind === kind && demoState === state;
                return (
                  <div
                    key={state}
                    role="button"
                    tabIndex={0}
                    onClick={() => { setDemoKind(kind); setDemoState(state); }}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setDemoKind(kind); setDemoState(state); } }}
                    className={cn(
                      "w-full text-left rounded-2xl overflow-hidden cursor-pointer",
                      "ring-2 transition-all duration-150",
                      isSelected
                        ? "ring-[var(--color-info)]"
                        : "ring-transparent hover:ring-[var(--color-border-strong)]"
                    )}
                    aria-label={`Select ${KIND_LABELS[kind]} ${STATE_LABELS[state]} variant`}
                    aria-pressed={isSelected}
                  >
                    <div className="mb-1.5 ml-1 text-[11px] uppercase tracking-widest text-[var(--color-fg-subtle)] font-[var(--font-prometheus)]">
                      {STATE_LABELS[state]}
                    </div>
                    <InAppNotification
                      state={state}
                      kind={kind}
                      className="rounded-2xl pointer-events-none"
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Demo trigger */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
            Live demo
          </h2>
          <p className="text-[13px] text-[var(--color-fg-muted)] font-[var(--font-prometheus)]">
            Selected: <span className="text-[var(--color-fg)]">{KIND_LABELS[demoKind]} · {STATE_LABELS[demoState]}</span>
          </p>
          <Button variant="primary" className="w-full" onClick={trigger}>
            Test it out
          </Button>
        </section>
      </main>
    </>
  );
}
