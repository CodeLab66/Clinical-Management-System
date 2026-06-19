import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function WorkflowStep({ label, description, active, complete }) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-[18px] bg-white/35 p-3">
      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold", complete ? "bg-success text-white" : active ? "bg-primary text-white" : "bg-white/65 text-text-muted")}>
        {complete ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
      </span>
      <span className="min-w-0">
        <span className={cn("block break-words text-sm font-bold leading-5", active || complete ? "text-text-main" : "text-text-muted")}>{label}</span>
        {description ? <span className="mt-1 block break-words text-xs leading-5 text-text-muted">{description}</span> : null}
      </span>
    </div>
  );
}
