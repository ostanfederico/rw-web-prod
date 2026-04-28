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
       * Prometheus Chat icon — rounded speech bubble.
       * Shape: 16×16 at 4px inset in 24×24. Corner radii (CSS): tl=9 tr=9 bl=9 br=2.
       * After proportional scaling in a 16px box: tl=tr=bl≈8, br=2.
       * tl and tr share center (12,12) → semicircle top; bl shares same center → quarter arc left.
       */}
      <path d="M12 4 A8 8 0 0 1 20 12 L20 18 A2 2 0 0 1 18 20 L12 20 A8 8 0 0 1 4 12 A8 8 0 0 1 12 4 Z" />
    </svg>
  );
}
