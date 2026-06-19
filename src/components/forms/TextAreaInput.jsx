import { cn } from "@/lib/utils";

export function TextAreaInput({ label, helper, error, className, required, rows = 4, ...props }) {
  return (
    <label className={cn("block md:col-span-2", className)}>
      {label ? <span className="mb-2 block text-sm font-bold text-text-main">{label}{required ? " *" : ""}</span> : null}
      <textarea
        rows={rows}
        className="orange-focus w-full rounded-[22px] border border-white/60 bg-white/55 px-4 py-3 text-sm text-text-main outline-none placeholder:text-text-muted"
        required={required}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs font-semibold text-danger">{error}</span> : helper ? <span className="mt-1 block text-xs text-text-muted">{helper}</span> : null}
    </label>
  );
}
