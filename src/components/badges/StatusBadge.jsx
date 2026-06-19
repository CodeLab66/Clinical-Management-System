import { getStatusMeta } from "@/constants/statuses";
import { toneClasses } from "@/constants/theme";
import { cn } from "@/lib/utils";

export function StatusBadge({ status = "pending", className }) {
  const meta = getStatusMeta(status);

  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold capitalize", toneClasses[meta.color], className)}>
      {meta.label}
    </span>
  );
}
