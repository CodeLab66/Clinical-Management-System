import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function BranchBadge({ branch = "All branches", className }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-white/65 px-3 py-1 text-xs font-bold text-text-secondary", className)}>
      <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
      {branch}
    </span>
  );
}
