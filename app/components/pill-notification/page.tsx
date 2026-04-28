"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/ui/button";
import { PillNotification } from "@/components/ui/pill-notification";

type PillNotificationVariant = "success" | "error" | "warning";

const examples: { variant: PillNotificationVariant; message: string }[] = [
  { variant: "success", message: "Payment sent successfully" },
  { variant: "error",   message: "Transaction failed" },
  { variant: "warning", message: "Low account balance" },
];

export default function PillNotificationPage() {
  const [active, setActive] = useState<{
    variant: PillNotificationVariant;
    message: string;
    key: number;
  } | null>(null);

  const show = (variant: PillNotificationVariant, message: string) =>
    setActive({ variant, message, key: Date.now() });

  return (
    <>
      <PageHeader
        title="Pill Notification"
        subtitle="Tap a variant to preview. Auto-dismisses after 4s or press × to dismiss early."
      />
      <main className="px-5 pb-8 flex flex-col gap-3">
        {examples.map(({ variant, message }) => (
          <Button
            key={variant}
            variant="secondary"
            onClick={() => show(variant, message)}
          >
            Show {variant}
          </Button>
        ))}
      </main>

      {active && (
        <PillNotification
          key={active.key}
          variant={active.variant}
          message={active.message}
          onDismiss={() => setActive(null)}
        />
      )}
    </>
  );
}
