import { cn } from "@/lib/utils";

export function CheckboxInput({ label, helper, className, ...props }) {
  return (
    <label className={cn("flex items-start gap-3 rounded-[20px] bg-white/45 p-4", className)}>
      <input className="mt-1 h-4 w-4 accent-primary" type="checkbox" {...props} />
      <span>
        <span className="block text-sm font-bold text-text-main">{label}</span>
        {helper ? <span className="mt-1 block text-xs text-text-muted">{helper}</span> : null}
      </span>
    </label>
  );
}
