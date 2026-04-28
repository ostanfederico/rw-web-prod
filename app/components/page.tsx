import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/app-shell/PageHeader";

const sections: { heading: string; entries: { name: string; href: string }[] }[] = [
  {
    heading: "Amount Input",
    entries: [{ name: "Amount Input", href: "/components/amount-input" }],
  },
  {
    heading: "Button",
    entries: [{ name: "Button Large", href: "/components/button" }],
  },
  {
    heading: "Confetti",
    entries: [{ name: "Confetti", href: "/components/confetti" }],
  },
  {
    heading: "Entry Point",
    entries: [{ name: "Entry Point", href: "/components/entry-point" }],
  },
  {
    heading: "In-App Notification",
    entries: [{ name: "In-App Notification", href: "/components/in-app-notification" }],
  },
  {
    heading: "Pill Notification",
    entries: [{ name: "Pill Notification", href: "/components/pill-notification" }],
  },
  {
    heading: "Tokens",
    entries: [{ name: "Tokens", href: "/components/tokens" }],
  },
  {
    heading: "Popover",
    entries: [{ name: "Notification Popover", href: "/components/notification-popover" }],
  },
];

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        title="Components"
        subtitle="Reusable UI building blocks. When one is ready, it graduates to @rockwallet/ui on npm."
      />
      <main className="px-5 pb-8 space-y-6">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-2 text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
              {section.heading}
            </h2>
            <ul className="overflow-hidden rounded-xl bg-[var(--color-bg-card)] divide-y divide-[var(--color-border)]">
              {section.entries.map((entry) => (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    className="flex items-center justify-between px-4 py-3 text-[var(--color-fg)] hover:bg-[var(--color-bg-raised)]"
                  >
                    <span>{entry.name}</span>
                    <ChevronRight size={16} className="text-[var(--color-fg-subtle)]" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
}
