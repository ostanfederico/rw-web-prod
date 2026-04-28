import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/app-shell/PageHeader";

const LINKS = [
  {
    label: "GitHub repo",
    href: "https://github.com/ostanfederico/rw-web-prod",
  },
  {
    label: "Vercel project",
    href: "https://vercel.com/federico-ostan-bazans-projects/rw-web-prod",
  },
  {
    label: "Prometheus Design System (Figma)",
    href: "https://www.figma.com/design/vT4esHtsM9b4JdCy2q5Nex/Prometheus-Design-System",
  },
  {
    label: "Prometheus Icons (Figma)",
    href: "https://www.figma.com/design/R94pMAkvOLPDbJZFSVOg8E/Prometheus-Icons",
  },
] as const;

export default function MorePage() {
  return (
    <>
      <PageHeader title="More" subtitle="Project links and references." />
      <main className="px-5 pb-8">
        <ul className="divide-y divide-[var(--color-border)] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-card)]">
          {LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-[var(--color-fg)] hover:bg-[var(--color-bg-raised)]"
              >
                <span>{label}</span>
                <ExternalLink size={16} className="text-[var(--color-fg-subtle)]" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs text-[var(--color-fg-subtle)]">
          RW Product Whiteboard · v0.1.0
        </p>
      </main>
    </>
  );
}
