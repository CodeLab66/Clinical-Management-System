import { Clock } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";

export function ActivityItem({ title, description, status, time, icon: Icon = Clock }) {
  return (
    <div className="flex gap-3 rounded-[20px] bg-white/45 p-4">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-text-main">{title}</p>
        {description ? <p className="mt-1 text-sm text-text-secondary">{description}</p> : null}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {status ? <StatusBadge status={status} /> : null}
          {time ? <span className="text-xs font-semibold text-text-muted">{time}</span> : null}
        </div>
      </div>
    </div>
  );
}
