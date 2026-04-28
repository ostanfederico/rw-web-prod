import { PageHeader } from "@/components/app-shell/PageHeader";
import { AmountInput } from "@/components/ui/amount-input";

const card = "rounded-2xl bg-[var(--color-bg-card)] py-10 space-y-10";
const sectionLabel = "text-xs uppercase tracking-wide text-[var(--color-fg-subtle)]";

export default function AmountInputPage() {
  return (
    <>
      <PageHeader
        title="Amount Input"
        subtitle="Used in Buy, Sell, Send, Swap. Tap the secondary row button to toggle Dollar ↔ Crypto."
      />
      <main className="px-5 pb-8 space-y-8">

        <section className="space-y-3">
          <h2 className={sectionLabel}>Input Type</h2>
          <div className={card}>
            <AmountInput
              inputType="Dollar"
              state="Filled"
              amount="100.00"
              equivalentAmount="3.12345 BSV"
              asset="BSV"
              availableBalance="$11,723.23"
              hasAvailableAmount
            />
            <AmountInput
              inputType="Crypto"
              state="Filled"
              amount="3.12345"
              equivalentAmount="$100"
              asset="BSV"
              availableBalance="$11,723.23"
              hasAvailableAmount
            />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className={sectionLabel}>State</h2>
          <div className={card}>
            <AmountInput state="Empty" inputType="Dollar" />
            <AmountInput
              state="Filled"
              inputType="Dollar"
              amount="100.00"
              equivalentAmount="3.12345 BSV"
              asset="BSV"
              availableBalance="$11,723.23"
              hasAvailableAmount
            />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className={sectionLabel}>Has Crypto Equivalent</h2>
          <div className={card}>
            <AmountInput state="Empty" hasCryptoEquivalent={false} />
            <AmountInput
              state="Empty"
              hasCryptoEquivalent
              equivalentAmount="0.00 BSV"
              asset="BSV"
            />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className={sectionLabel}>Has Available Amount</h2>
          <div className={card}>
            <AmountInput
              state="Filled"
              amount="100.00"
              equivalentAmount="3.12345 BSV"
              hasAvailableAmount={false}
            />
            <AmountInput
              state="Filled"
              amount="100.00"
              equivalentAmount="3.12345 BSV"
              asset="BSV"
              availableBalance="$11,723.23"
              hasAvailableAmount
            />
          </div>
        </section>

      </main>
    </>
  );
}
