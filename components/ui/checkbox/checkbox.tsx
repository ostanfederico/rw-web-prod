import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Check } from "@/components/icons/Check";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: ReactNode;
  error?: boolean;
};

const wrapper =
  "inline-flex items-center gap-2 select-none cursor-pointer " +
  "has-[:disabled]:cursor-not-allowed";

const box = cn(
  "relative inline-flex items-center justify-center shrink-0 size-[18px] rounded-[4px]",
  "bg-[var(--checkbox-bg)] transition-colors",
  "border border-transparent",
  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-info)]",
  "peer-disabled:bg-[var(--checkbox-bg-disabled)]",
  "peer-checked:[&>svg]:opacity-100",
  "group-data-[error=true]/cb:border-[var(--checkbox-border-error)]"
);

const labelText = cn(
  "font-[var(--font-prometheus)] text-[16px] leading-[24px] tracking-[0.5px]",
  "text-[var(--checkbox-label)]",
  "group-has-[:disabled]/cb:text-[var(--checkbox-label-disabled)]",
  "group-data-[error=true]/cb:text-[var(--checkbox-label-error)]"
);

export function Checkbox({
  label,
  error = false,
  checked,
  defaultChecked,
  disabled,
  className,
  ...rest
}: CheckboxProps) {
  return (
    <label
      data-error={error || undefined}
      className={cn("group/cb", wrapper, className)}
    >
      <span className="relative inline-flex items-center justify-center size-[42px] -m-[12px]">
        <input
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-invalid={error || undefined}
          className="peer sr-only"
          {...rest}
        />
        <span className={box}>
          <Check
            size={16}
            strokeWidth={3}
            className="text-[var(--checkbox-icon)] opacity-0 transition-opacity"
          />
        </span>
      </span>
      {label !== undefined && <span className={labelText}>{label}</span>}
    </label>
  );
}
