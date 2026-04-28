import { Workflow } from "lucide-react";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { EmptyState } from "@/components/app-shell/EmptyState";

export default function FlowsPage() {
  return (
    <>
      <PageHeader
        title="Flows"
        subtitle="End-to-end screen flows. Use these to prototype real interactions before native build."
      />
      <main className="px-5 pb-8">
        <EmptyState
          icon={Workflow}
          title="No flows yet"
          hint="Add a flow at app/flows/<your-flow>/page.tsx — see docs/WORKFLOW.md."
        />
      </main>
    </>
  );
}
