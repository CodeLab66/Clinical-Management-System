import { cn } from "@/lib/utils";

export function TextInput({ label, helper, error, className, required, ...props }) {
  return (
    <label className={cn("block", className)}>
      {label ? <span className="mb-2 block text-sm font-bold text-text-main">{label}{required ? " *" : ""}</span> : null}
      <input
        className="orange-focus min-h-11 w-full rounded-full border border-white/60 bg-white/55 px-4 text-sm text-text-main outline-none placeholder:text-text-muted"
        required={required}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs font-semibold text-danger">{error}</span> : helper ? <span className="mt-1 block text-xs text-text-muted">{helper}</span> : null}
    </label>
  );
}
