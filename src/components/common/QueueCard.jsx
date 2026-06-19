import { Clock, PawPrint, Stethoscope } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { cn } from "@/lib/utils";

export function QueueCard({ item, actions, className }) {
  return (
    <article
      className={cn(
        "rounded-[22px] border border-white/60 bg-white/55 p-4 shadow-[0_10px_25px_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            {item.token_number}
          </p>
          <h3 className="mt-1 break-words font-heading text-lg font-bold text-text-main">
            {item.pet_name}
          </h3>
          <p className="break-words text-sm text-text-secondary">{item.owner_name}</p>
        </div>
        <PriorityBadge priority={item.priority} />
      </div>
      <div className="mt-4 grid gap-2 text-sm text-text-secondary">
        <span className="flex min-w-0 items-center gap-2">
          <PawPrint className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0 break-words">
            {item.species} / {item.service}
          </span>
        </span>
        <span className="flex min-w-0 items-center gap-2">
          <Stethoscope className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0 break-words">{item.doctor_name || item.doctor}</span>
        </span>
        <span className="flex min-w-0 items-center gap-2">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0 break-words">
            {item.waiting_minutes || item.waiting_time} min waiting
          </span>
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <StatusBadge status={item.status} />
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </article>
  );
}
