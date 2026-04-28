export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="app-chrome px-5 pt-6 pb-4">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{subtitle}</p>
      )}
    </header>
  );
}
