import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-primary-10)] text-[var(--color-fg)] hover:bg-[var(--color-primary-11)]",
        secondary:
          "border-transparent bg-[var(--color-bg-raised)] text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-card)]",
        destructive:
          "border-transparent bg-[var(--color-danger)] text-[var(--color-fg)] hover:bg-[var(--color-danger)]/80",
        outline: "text-[var(--color-fg)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
