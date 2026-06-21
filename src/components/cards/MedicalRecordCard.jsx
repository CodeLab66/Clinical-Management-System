import { StatusBadge } from "@/components/badges/StatusBadge";

export function MedicalRecordCard({ record, onView }) {
  return (
    <button type="button" className="rounded-[22px] border border-white/65 bg-white/60 p-4 text-left shadow-soft transition hover:bg-white/80" onClick={() => onView?.(record)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-heading text-base font-bold text-text-main">{record.petName}</h3>
          <p className="mt-1 truncate text-sm font-semibold text-text-secondary">{record.ownerName}</p>
        </div>
        <StatusBadge status={record.status} />
      </div>
      <p className="mt-3 text-sm font-bold text-text-main">{record.lastDiagnosis}</p>
      <p className="mt-1 text-xs text-text-muted">{record.lastVisit} - {record.doctor}</p>
      <div className="mt-3 flex flex-wrap gap-2">{record.alerts.slice(0, 2).map((alert) => <span key={alert} className="rounded-full bg-warning/15 px-2 py-1 text-[11px] font-bold text-[#8a5a17]">{alert}</span>)}</div>
    </button>
  );
}
