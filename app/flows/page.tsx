import Link from "next/link";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { ChevronRight } from "lucide-react";

const FLOWS = [
  {
    href: "/flows/home",
    label: "Home Screen",
    description: "Chime-inspired dashboard — balance hero, account card, promo carousel",
  },
  {
    href: "/flows/wrapped",
    label: "2025 Wrapped",
    description: "Spotify-style year-in-review — volume, top tokens, personality, swipeable story",
  },
];

export default function FlowsPage() {
  return (
    <>
      <PageHeader
        title="Flows"
        subtitle="End-to-end screen flows. Use these to prototype real interactions before native build."
      />
      <main className="px-5 pb-8">
        <ul className="flex flex-col gap-3">
          {FLOWS.map(({ href, label, description }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center justify-between bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] px-4 py-3 gap-3"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--color-fg)]">{label}</p>
                  <p className="text-xs text-[var(--color-fg-subtle)] mt-0.5">{description}</p>
                </div>
                <ChevronRight size={16} className="text-[var(--color-fg-subtle)] shrink-0" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
