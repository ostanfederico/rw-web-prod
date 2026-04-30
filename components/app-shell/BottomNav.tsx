"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Workflow, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

const TABS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/components", label: "Components", Icon: LayoutGrid },
  { href: "/flows", label: "Flows", Icon: Workflow },
  { href: "/more", label: "More", Icon: MoreHorizontal },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const HIDDEN_ON = ["/flows/wrapped"];

export function BottomNav() {
  const pathname = usePathname();

  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <nav
      aria-label="Primary"
      className="app-chrome fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[440px] border-t border-[var(--color-border)] bg-[var(--color-bg-raised)]/90 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4">
        {TABS.map(({ href, label, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 text-[11px] transition-colors",
                  active
                    ? "text-[var(--color-primary-7)]"
                    : "text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)]"
                )}
              >
                <Icon size={22} aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
