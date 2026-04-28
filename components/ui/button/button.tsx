import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "text";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: ReactNode;
};

const base =
  "relative inline-flex items-center justify-center font-medium text-[15px] leading-5 tracking-[0.1px] " +
  "font-[var(--font-prometheus)] " +
  "transition-colors select-none disabled:cursor-not-allowed";

const layoutWithIcon = "gap-2 pl-6 pr-4 py-2.5 rounded-2xl";
const layoutNoIcon = "px-4 py-3 rounded-2xl";
const layoutTextNoIcon = "px-4 py-3 rounded-xl";

const variantClasses: Record<Variant, string> = {
  primary: cn(
    "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-label)]",
    "border-[1.5px] border-[var(--btn-primary-border)]",
    "hover:bg-[var(--btn-primary-bg-hover)]",
    "active:bg-[var(--btn-primary-bg-pressed)] active:shadow-[var(--btn-pressed-inset)]",
    "disabled:bg-[var(--btn-primary-bg-disabled)] disabled:text-[var(--btn-primary-label-disabled)] disabled:border-transparent disabled:shadow-none"
  ),
  secondary: cn(
    "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-label)]",
    "border-[1.5px] border-[var(--btn-secondary-border)]",
    "hover:bg-[var(--btn-secondary-bg-hover)]",
    "active:bg-[var(--btn-secondary-bg-pressed)] active:shadow-[var(--btn-pressed-inset)]",
    "disabled:bg-[var(--btn-secondary-bg-disabled)] disabled:text-[var(--btn-secondary-label-disabled)] disabled:border-[var(--btn-secondary-border-disabled)] disabled:shadow-none"
  ),
  text: cn(
    "bg-transparent text-[var(--btn-text-label)]",
    "hover:text-[var(--btn-text-label-hover)]",
    "active:text-[var(--btn-text-label-pressed)]",
    "disabled:text-[var(--btn-text-label-disabled)]"
  ),
};

export function Button({
  variant = "primary",
  icon,
  children,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const layout =
    variant === "text" && !icon
      ? layoutTextNoIcon
      : icon
        ? layoutWithIcon
        : layoutNoIcon;

  return (
    <button
      type={type}
      className={cn(base, layout, variantClasses[variant], className)}
      {...rest}
    >
      <span>{children}</span>
      {icon ? (
        <span className="inline-flex size-6 shrink-0 items-center justify-center">
          {icon}
        </span>
      ) : null}
    </button>
  );
}
