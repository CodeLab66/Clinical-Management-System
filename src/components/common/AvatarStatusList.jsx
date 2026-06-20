import { ChevronRight } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";
import { cn } from "@/lib/utils";

const statusStyles = {
  completed: "bg-success/12 text-success",
  in_progress: "bg-primary-soft text-primary-dark",
  pending: "bg-warning/15 text-[#8a5a17]",
  critical: "bg-danger/10 text-danger",
  waiting: "bg-warning/15 text-[#8a5a17]",
};

const statusLabels = {
  completed: "Completed",
  in_progress: "In Progress",
  pending: "Pending",
  critical: "Critical",
  waiting: "Waiting",
};

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function AvatarStatusList({ title, actionLabel, items = [], compact = false, className }) {
  return (
    <GlassCard padding={compact ? "compact" : "default"} className={cn("rounded-[24px] border-white/65 bg-white/70", className)}>
      <div className={cn("flex items-center justify-between gap-3", compact ? "mb-3" : "mb-5")}>
        <h3 className={cn("font-heading font-bold text-text-main", compact ? "text-base" : "text-lg")}>{title}</h3>
        {actionLabel ? (
          <button type="button" className="inline-flex items-center gap-1 text-xs font-bold text-primary">
            {actionLabel}
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <div className={cn(compact ? "space-y-2.5" : "space-y-3")}>
        {items.map((item) => (
          <div key={item.id || item.name} className={cn("flex min-w-0 items-center gap-3 rounded-[20px] bg-white/55", compact ? "p-2.5" : "p-3")}>
            <span className={cn("flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-soft text-sm font-bold text-primary-dark", compact ? "h-9 w-9" : "h-11 w-11")}>
              {item.avatar ? <img src={item.avatar} alt="" className="h-full w-full object-cover" /> : initials(item.name)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-text-main">{item.name}</span>
              {item.subtitle ? <span className="mt-0.5 block truncate text-xs font-semibold text-text-muted">{item.subtitle}</span> : null}
            </span>
            <span className={cn("shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold leading-none", statusStyles[item.status] || statusStyles.pending)}>
              {statusLabels[item.status] || item.status}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
