import { PageHeader } from "@/components/app-shell/PageHeader";
import { Tag } from "@/components/ui/tag";

const types = ["positive", "negative", "warning", "neutral"] as const;

export default function TagPage() {
  return (
    <>
      <PageHeader
        title="Tag"
        subtitle="Status badge in four semantic variants, with optional leading icon."
      />
      <main className="px-5 pb-8 space-y-8">
        {types.map((type) => (
          <section key={type} className="space-y-3">
            <h2 className="text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]">
              {type}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <Tag type={type}>Tag text</Tag>
              <Tag type={type} showIcon>Tag text</Tag>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
