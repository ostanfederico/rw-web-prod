import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SpinnerSize = "large" | "small";

export type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: SpinnerSize;
};

const config: Record<SpinnerSize, { container: string; cx: number; cy: number; r: number; stroke: number }> = {
  large: { container: "size-[44px]", cx: 22, cy: 22, r: 16.5, stroke: 3 },
  small: { container: "size-[24px]", cx: 12, cy: 12, r: 9,    stroke: 2 },
};

export function Spinner({ size = "large", className, ...rest }: SpinnerProps) {
  const { container, cx, cy, r, stroke } = config[size];
  const dim = cx * 2;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * 0.75;
  const gap  = circumference * 0.25;

  return (
    <div
      className={cn("flex items-center justify-center", container, className)}
      role="status"
      aria-label="Loading"
      {...rest}
    >
      <svg
        viewBox={`0 0 ${dim} ${dim}`}
        width={dim}
        height={dim}
        aria-hidden="true"
        className="animate-[spinner-spin_0.8s_linear_infinite]"
        style={{ transformOrigin: "center" }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--spinner-arc)"
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${gap}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
    </div>
  );
}
