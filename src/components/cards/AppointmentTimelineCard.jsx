import { Clock3 } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";

export function AppointmentTimelineCard({ appointment, onClick }) {
  return (
    <button
      type="button"
      className="w-full rounded-[20px] border border-white/65 bg-white/65 p-4 text-left shadow-soft transition hover:bg-white/85"
      onClick={() => onClick?.(appointment)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
            <Clock3 className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-heading text-base font-bold text-text-main">{appointment.time} - {appointment.petName}</p>
            <p className="mt-1 truncate text-sm font-semibold text-text-secondary">{appointment.ownerName} - {appointment.service}</p>
            <p className="mt-1 truncate text-xs font-bold text-text-muted">{appointment.doctor} - {appointment.branch} - {appointment.duration} min</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <StatusBadge status={appointment.status} />
          <PriorityBadge priority={appointment.priority} />
        </div>
      </div>
    </button>
  );
}
