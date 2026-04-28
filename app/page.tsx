import { PageHeader } from "@/components/app-shell/PageHeader";

export default function Home() {
  return (
    <>
      <PageHeader
        title="Product Whiteboard"
        subtitle="A canvas for designers and PMs to prototype mobile flows."
      />
      <main className="px-5 pb-8">
        <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-card)] p-5">
          <p className="text-[var(--color-fg)]">
            Welcome. This is a blank canvas — pick a tab below to add a flow,
            browse components, or open the more menu for links.
          </p>
          <p className="mt-3 text-sm text-[var(--color-fg-muted)]">
            Push a branch, get a Vercel preview URL, scan its QR, install on
            your phone, iterate.
          </p>
        </div>
      </main>
    </>
  );
}
