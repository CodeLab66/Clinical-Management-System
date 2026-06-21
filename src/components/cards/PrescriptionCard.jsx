import { StatusBadge } from "@/components/badges/StatusBadge";

export function PrescriptionCard({ prescription, onView }) {
  return (
    <button type="button" className="rounded-[22px] border border-white/65 bg-white/60 p-4 text-left shadow-soft transition hover:bg-white/80" onClick={() => onView?.(prescription)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-primary-dark">{prescription.id}</p>
          <h3 className="mt-1 font-heading text-base font-bold text-text-main">{prescription.petName}</h3>
        </div>
        <StatusBadge status={prescription.status} />
      </div>
      <p className="mt-3 text-sm font-semibold text-text-secondary">{prescription.diagnosis}</p>
      <p className="mt-2 text-xs text-text-muted">{prescription.medicines.length} medicines - {prescription.branch}</p>
    </button>
  );
}
