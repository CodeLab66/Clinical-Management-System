import { CalendarClock } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";

export function VaccinationRecordCard({ record, onMarkGiven, onReminder }) {
  return (
    <article className="rounded-[22px] border border-white/65 bg-white/60 p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-heading text-base font-bold text-text-main">{record.petName}</p>
          <p className="mt-1 truncate text-sm font-semibold text-text-secondary">{record.ownerName}</p>
        </div>
        <StatusBadge status={record.status} />
      </div>
      <div className="mt-4 space-y-1 text-sm text-text-secondary">
        <p><span className="font-bold text-text-main">{record.type === "vaccine" ? "Vaccine" : "Dewormer"}:</span> {record.vaccineOrDewormer}</p>
        <p>Last: {record.lastGiven}</p>
        <p className="flex items-center gap-1"><CalendarClock className="h-4 w-4 text-primary-dark" aria-hidden="true" />Next: {record.nextDue}</p>
        <p>{record.branch}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="rounded-full bg-primary px-3 py-2 text-xs font-bold text-white" onClick={() => onMarkGiven?.(record)}>Mark Given</button>
        <button type="button" className="rounded-full bg-white/70 px-3 py-2 text-xs font-bold text-text-secondary" onClick={() => onReminder?.(record)}>Reminder</button>
      </div>
    </article>
  );
}
