"use client";

import type { HTMLAttributes, CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { CloseRound } from "@/components/icons/CloseRound";
import { Chat } from "@/components/icons/Chat";

export type NotifState = "default" | "error" | "warning";
export type NotifKind = "system" | "user";

export type InAppNotificationProps = HTMLAttributes<HTMLDivElement> & {
  state?: NotifState;
  kind?: NotifKind;
  onDismiss?: () => void;
  onCtaClick?: () => void;
};

// Figma: Bg/System Notification/Transparent as the base layer, tinted by state
function getBgStyle(state: NotifState, kind: NotifKind): CSSProperties {
  const base = "linear-gradient(90deg, rgba(0,22,51,0.46) 0%, rgba(0,22,51,0.46) 100%)";
  if (state === "error") {
    const alpha = kind === "system" ? 0.36 : 0.2;
    return { backgroundImage: `linear-gradient(-65.72deg, rgba(213,118,114,0) 0%, rgba(213,118,114,${alpha}) 100%), ${base}` };
  }
  if (state === "warning") {
    const alpha = kind === "system" ? 0.36 : 0.2;
    return { backgroundImage: `linear-gradient(-65.72deg, rgba(234,202,102,0) 0%, rgba(234,202,102,${alpha}) 100%), ${base}` };
  }
  return { background: "var(--in-app-notification-bg)" };
}

const BORDER_VAR: Record<NotifState, string> = {
  default: "var(--in-app-notification-border-default)",
  error: "var(--in-app-notification-border-error)",
  warning: "var(--in-app-notification-border-warning)",
};

// Figma uses emoji for the leading icon slot
const SYSTEM_EMOJI: Record<NotifState, string> = { default: "ℹ", error: "🚨", warning: "⚠️" };
const USER_EMOJI: Record<NotifState, string> = { default: "🚀", error: "🚨", warning: "⚠️" };

const SYSTEM_BODY: Record<NotifState, string> = {
  default: "One of your transactions is still pending. This can happen during high activity—please wait a few minutes or contact support.",
  error: "We're having trouble loading price data. Your portfolio may be out of date, please try refreshing or chat with us.",
  warning: "We're having trouble loading price data. Your portfolio may be out of date, please try refreshing or chat with us.",
};

const SYSTEM_CTA: Record<NotifState, string> = {
  default: "View transaction details",
  error: "Chat with us",
  warning: "Chat with us",
};

const USER_TITLE: Record<NotifState, string> = {
  default: "Send crypto confirmed",
  error: "Error notification",
  warning: "Send crypto failed",
};

const USER_BODY: Record<NotifState, string> = {
  default: "Your 0.0001 BTC to 0x92… send was confirmed on a Blockchain",
  error: "Error message",
  warning: "Your 0.0001 BTC to 0x92… send has failed",
};

export function InAppNotification({
  state = "default",
  kind = "system",
  onDismiss,
  onCtaClick,
  className,
  ...rest
}: InAppNotificationProps) {
  const showChatIcon = kind === "system" && state !== "default";
  const emoji = kind === "system" ? SYSTEM_EMOJI[state] : USER_EMOJI[state];

  return (
    <div
      className={cn(
        "w-full backdrop-blur-[15px] rounded-b-2xl border-b",
        "flex gap-3 items-start",
        "px-6 pb-4 pt-8",
        className
      )}
      style={{ ...getBgStyle(state, kind), borderColor: BORDER_VAR[state] }}
      {...rest}
    >
      {/* Leading emoji */}
      <span className="shrink-0 w-[14px] text-[14px] leading-5 text-white font-[var(--font-prometheus)]">
        {emoji}
      </span>

      {kind === "user" ? (
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <p className="text-[14px] leading-5 tracking-[0.1px] font-medium text-[var(--in-app-notification-text-header)] font-[var(--font-display)]">
            {USER_TITLE[state]}
          </p>
          <p className="text-[14px] leading-5 tracking-[0.25px] font-[var(--font-prometheus)] text-[var(--in-app-notification-text-body)]">
            {USER_BODY[state]}
          </p>
        </div>
      ) : (
        <div className={cn("flex flex-col gap-3 items-start", showChatIcon ? "shrink-0 w-[269px]" : "flex-1 min-w-0")}>
          <p className="w-full text-[14px] leading-5 tracking-[0.25px] font-[var(--font-prometheus)] text-[var(--in-app-notification-text-body)]">
            {SYSTEM_BODY[state]}
          </p>
          <button
            type="button"
            onClick={onCtaClick}
            className={cn(
              "flex items-center justify-center h-8 rounded-full",
              "bg-[var(--btn-secondary-bg)] border-[1.5px] border-[var(--btn-secondary-border)]",
              "text-[15px] leading-5 tracking-[0.1px] font-medium font-[var(--font-prometheus)]",
              "text-[var(--in-app-notification-label)] py-1.5",
              showChatIcon ? "gap-2 pl-6 pr-4" : "px-4"
            )}
          >
            {SYSTEM_CTA[state]}
            {showChatIcon && <Chat size={24} className="text-[var(--in-app-notification-label)]" />}
          </button>
        </div>
      )}

      {/* Close / dismiss */}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 size-[42px] flex items-start justify-end overflow-clip"
      >
        <CloseRound size={20} className="text-[var(--color-fg)]" />
      </button>
    </div>
  );
}
