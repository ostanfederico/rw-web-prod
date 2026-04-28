import { LayoutGrid } from "lucide-react";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { EmptyState } from "@/components/app-shell/EmptyState";

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        title="Components"
        subtitle="Reusable UI building blocks. When one is ready, it graduates to @rockwallet/ui on npm."
      />
      <main className="px-5 pb-8">
        <EmptyState
          icon={LayoutGrid}
          title="No components yet"
          hint="Add a component at app/components/<your-name>/page.tsx and it will appear here."
        />
      </main>
    </>
  );
}
