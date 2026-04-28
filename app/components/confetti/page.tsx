import { PageHeader } from "@/components/app-shell/PageHeader";
import { Confetti } from "@/components/ui/confetti";

export default function ConfettiPage() {
  return (
    <>
      <PageHeader
        title="Confetti"
        subtitle="Tap the button — particles burst from it, scatter full-screen, fall, then fade."
      />
      <main className="px-5 pb-8 space-y-8">
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
            Default
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Confetti />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
            Custom labels
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Confetti label="Yay! 🥳" />
            <Confetti label="🎊 Party time" />
          </div>
        </section>
      </main>
    </>
  );
}
