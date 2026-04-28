import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  hint,
  children,
}: {
  icon: LucideIcon;
  title: string;
  hint?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] p-8 text-center">
      <Icon size={28} className="text-[var(--color-fg-subtle)]" aria-hidden />
      <h2 className="text-base font-semibold text-[var(--color-fg)]">{title}</h2>
      {hint && (
        <p className="text-sm text-[var(--color-fg-muted)]">{hint}</p>
      )}
      {children}
    </div>
  );
}
