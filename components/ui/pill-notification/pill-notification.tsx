"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { CheckRing } from "@/components/icons/CheckRing";
import { Close } from "@/components/icons/Close";
import { CloseRing } from "@/components/icons/CloseRing";
import { Alarm } from "@/components/icons/Alarm";

type PillNotificationVariant = "success" | "error" | "warning";

export type PillNotificationProps = {
  variant: PillNotificationVariant;
  message: string;
  onDismiss?: () => void;
};

function StateIcon({ variant }: { variant: PillNotificationVariant }) {
  if (variant === "success")
    return <CheckRing size={20} className="text-[var(--notification-success-icon)]" />;
  if (variant === "error")
    return <CloseRing size={20} className="text-[var(--notification-error-icon)]" />;
  return <Alarm size={20} className="text-[var(--notification-warning-icon)]" />;
}

const labelClass: Record<PillNotificationVariant, string> = {
  success: "text-[var(--notification-success-label)]",
  error:   "text-[var(--notification-error-label)]",
  warning: "text-[var(--notification-warning-label)]",
};

export function PillNotification({ variant, message, onDismiss }: PillNotificationProps) {
  const [mounted, setMounted] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const dismissed = useRef(false);

  const triggerDismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    setDismissing(true);
    setTimeout(() => onDismiss?.(), 200);
  };

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(triggerDismiss, 4000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      style={{
        background: "var(--notification-bg)",
        backdropFilter: "blur(var(--notification-blur))",
        WebkitBackdropFilter: "blur(var(--notification-blur))",
        // Nav bar (~64px) + 60px requested margin + safe-area on iPhone
        bottom: "calc(124px + env(safe-area-inset-bottom))",
        zIndex: 9999,
      }}
      className={cn(
        "fixed left-1/2 -translate-x-1/2",
        "inline-flex items-center gap-[var(--notification-gap)]",
        "px-[var(--notification-px)] py-[var(--notification-py)]",
        "rounded-full",
        dismissing
          ? "[animation:notification-dismiss_0.2s_ease-in_forwards]"
          : "[animation:notification-show_4s_ease-in-out_forwards]"
      )}
    >
      <StateIcon variant={variant} />
      <span
        className={cn(
          "font-[var(--font-prometheus)] text-base leading-6 tracking-[0.5px] whitespace-nowrap",
          labelClass[variant]
        )}
      >
        {message}
      </span>
      <button
        type="button"
        onClick={triggerDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 text-[var(--notification-dismiss-icon)] transition-opacity hover:opacity-70"
      >
        <Close size={24} />
      </button>
    </div>,
    document.body
  );
}
