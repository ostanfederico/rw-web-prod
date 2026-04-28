import type { SVGProps } from "react";

export function Chat({
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/*
       * Prometheus Chat icon (node 15106:2589).
       * Bubble: 16×16 at 4px inset, radii tl=tr=bl≈8 br=2 (proportionally scaled).
       * Two internal lines from Figma vectors:
       *   imgVector7 → 8×2px centered at (12, 11) — longer top line
       *   imgVector8 → 5×2px centered at (13.5, 15) — shorter bottom line
       */}
      <path d="M12 4 A8 8 0 0 1 20 12 L20 18 A2 2 0 0 1 18 20 L12 20 A8 8 0 0 1 4 12 A8 8 0 0 1 12 4 Z" />
      <line x1="8" y1="11" x2="16" y2="11" />
      <line x1="11" y1="15" x2="16" y2="15" />
    </svg>
  );
}
