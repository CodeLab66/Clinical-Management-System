import { Clock } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { cn } from "@/lib/utils";

export function ActivityItem({ title, description, status, time, icon: Icon = Clock, compact = false }) {
  return (
    <div className={cn("flex gap-3 rounded-[20px] bg-white/45", compact ? "p-3" : "p-4")}>
      <span className={cn("inline-flex shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark", compact ? "h-9 w-9" : "h-10 w-10")}>
        <Icon className={cn(compact ? "h-4 w-4" : "h-5 w-5")} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn("break-words font-semibold text-text-main", compact ? "text-sm leading-5" : undefined)}>{title}</p>
        {description ? <p className={cn("mt-1 break-words text-text-secondary", compact ? "text-xs leading-5" : "text-sm")}>{description}</p> : null}
        <div className={cn("flex flex-wrap items-center gap-2", compact ? "mt-2" : "mt-3")}>
          {status ? <StatusBadge status={status} /> : null}
          {time ? <span className="text-xs font-semibold text-text-muted">{time}</span> : null}
        </div>
      </div>
    </div>
  );
}
