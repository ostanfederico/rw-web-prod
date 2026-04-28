import { cn } from "@/lib/cn";
import { GridWidget } from "@/components/icons/GridWidget";

type InputType = "Dollar" | "Crypto";
type InputState = "Empty" | "Filled";

export type AmountInputProps = {
  inputType?: InputType;
  state?: InputState;
  hasCryptoEquivalent?: boolean;
  hasAvailableAmount?: boolean;
  /** Main displayed value, e.g. "100.00" or "3.12345" */
  amount?: string;
  /** Secondary converted value, e.g. "3.12345 BSV" or "$100" */
  equivalentAmount?: string;
  /** Crypto asset ticker, e.g. "BSV" */
  asset?: string;
  /** Formatted available balance, e.g. "$11,723.23" */
  availableBalance?: string;
  onToggle?: () => void;
  className?: string;
};

export function AmountInput({
  inputType = "Dollar",
  state = "Empty",
  hasCryptoEquivalent = false,
  hasAvailableAmount = false,
  amount = "0.00",
  equivalentAmount,
  asset = "BSV",
  availableBalance = "$0.00",
  onToggle,
  className,
}: AmountInputProps) {
  const isFilled = state === "Filled";
  const showSecondaryRow = isFilled || (state === "Empty" && hasCryptoEquivalent);
  const showBalance = isFilled && hasAvailableAmount;

  const [integerPart, decimalPart = "00"] = amount.split(".");

  const resolvedEquivalent =
    equivalentAmount ?? (inputType === "Dollar" ? `0.00 ${asset}` : "$0.00");

  return (
    <div
      className={cn(
        "flex flex-col items-center px-6",
        showBalance ? "gap-6" : "gap-0",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 w-full">
        {/* Large amount display */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1">
            {inputType === "Dollar" && (
              <span className="text-[22px] font-medium leading-7 text-[var(--amount-unit-text)] font-[var(--font-display)]">
                $
              </span>
            )}
            <div className="flex items-start gap-1 whitespace-nowrap drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
              <span className="text-[57px] leading-[64px] font-normal tracking-[-0.25px] text-[var(--amount-display-text)] font-[var(--font-display)]">
                {integerPart}
              </span>
              <span className="text-[32px] leading-10 font-medium text-[var(--amount-display-decimal)] font-[var(--font-display)]">
                {decimalPart}
              </span>
            </div>
            {inputType === "Crypto" && (
              <span className="text-[22px] font-medium leading-7 text-[var(--amount-unit-text)] font-[var(--font-display)]">
                {asset}
              </span>
            )}
          </div>
        </div>

        {/* Secondary amount + toggle button (only tappable area) */}
        {showSecondaryRow && (
          <div className="flex items-center gap-2.5">
            <span className="text-base font-normal leading-6 tracking-[0.5px] text-[var(--amount-body-text)] font-[var(--font-prometheus)]">
              {resolvedEquivalent}
            </span>
            <button
              type="button"
              onClick={onToggle}
              aria-label="Toggle denomination"
              className="shrink-0 flex items-center justify-center size-[18px] rounded-[5px] overflow-hidden text-[var(--amount-unit-text)] bg-[var(--btn-secondary-bg)] border-[0.5px] border-[var(--btn-secondary-border)] active:opacity-70"
            >
              <GridWidget className="size-[9px]" />
            </button>
          </div>
        )}
      </div>

      {/* Available balance */}
      {showBalance && (
        <p className="text-sm font-medium leading-5 tracking-[0.1px] text-center whitespace-nowrap text-[var(--amount-help-text)] font-[var(--font-display)]">
          {asset} Balance: {availableBalance}
        </p>
      )}
    </div>
  );
}
