export function GridWidget({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="5.833" height="5.833" rx="0.833" stroke="currentColor" strokeWidth="1.667" />
      <rect x="11.667" y="2.5" width="5.833" height="5.833" rx="0.833" stroke="currentColor" strokeWidth="1.667" />
      <rect x="2.5" y="11.667" width="5.833" height="5.833" rx="0.833" stroke="currentColor" strokeWidth="1.667" />
      <rect x="11.667" y="11.667" width="5.833" height="5.833" rx="0.833" stroke="currentColor" strokeWidth="1.667" />
    </svg>
  );
}
