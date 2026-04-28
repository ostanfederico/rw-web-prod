import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/ui/button";
import { AddRound } from "@/components/icons/AddRound";

const variants = ["primary", "secondary", "text"] as const;

export default function ButtonPage() {
  return (
    <>
      <PageHeader
        title="Button Large"
        subtitle="Hover or press to see hover/pressed states. Disabled examples ignore input."
      />
      <main className="px-5 pb-8 space-y-8">
        {variants.map((variant) => (
          <section key={variant} className="space-y-3">
            <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
              {variant}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant={variant}>Label</Button>
              <Button variant={variant} icon={<AddRound />}>
                Label
              </Button>
              <Button variant={variant} disabled>
                Label
              </Button>
              <Button variant={variant} icon={<AddRound />} disabled>
                Label
              </Button>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
