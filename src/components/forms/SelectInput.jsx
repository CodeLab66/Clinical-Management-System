import { cn } from "@/lib/utils";

export function SelectInput({ label, helper, error, options = [], className, required, ...props }) {
  return (
    <label className={cn("block", className)}>
      {label ? <span className="mb-2 block text-sm font-bold text-text-main">{label}{required ? " *" : ""}</span> : null}
      <select
        className="orange-focus min-h-11 w-full rounded-full border border-white/60 bg-white/55 px-4 text-sm text-text-main outline-none"
        required={required}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error ? <span className="mt-1 block text-xs font-semibold text-danger">{error}</span> : helper ? <span className="mt-1 block text-xs text-text-muted">{helper}</span> : null}
    </label>
  );
}
