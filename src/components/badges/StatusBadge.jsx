import { getStatusMeta } from "@/constants/statuses";
import { toneClasses } from "@/constants/theme";
import { cn } from "@/lib/utils";

export function StatusBadge({ status = "pending", className }) {
  const meta = getStatusMeta(status);

  return (
    <span className={cn("inline-flex max-w-full items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold capitalize leading-none", toneClasses[meta.color], className)}>
      {meta.label}
    </span>
  );
}
