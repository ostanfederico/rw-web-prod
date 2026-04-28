import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { CheckCircle } from "@/components/icons/CheckCircle";

type TagType = "positive" | "negative" | "warning" | "neutral";

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  type?: TagType;
  showIcon?: boolean;
};

const base =
  "inline-flex items-center rounded-[12px] py-[2px] " +
  "font-[var(--font-prometheus)] text-[12px] leading-[16px] tracking-[0.4px] font-normal whitespace-nowrap";

const typeClasses: Record<TagType, string> = {
  positive: "bg-[var(--tag-bg-positive)] text-[var(--tag-label-positive)]",
  negative: "bg-[var(--tag-bg-negative)] text-[var(--tag-label-negative)]",
  warning: "bg-[var(--tag-bg-warning)] text-[var(--tag-label-warning)]",
  neutral: "bg-[var(--tag-bg-neutral)] text-[var(--tag-label-neutral)]",
};

export function Tag({
  type = "positive",
  showIcon = false,
  children,
  className,
  ...rest
}: TagProps) {
  return (
    <span
      className={cn(
        base,
        typeClasses[type],
        showIcon ? "gap-[4px] pl-[4px] pr-[8px]" : "px-[8px]",
        className
      )}
      {...rest}
    >
      {showIcon && <CheckCircle />}
      {children}
    </span>
  );
}
