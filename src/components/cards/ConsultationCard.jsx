import { ArrowRight } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";

export function ConsultationCard({ consultation, onOpen }) {
  return (
    <article className="rounded-[22px] border border-white/65 bg-white/60 p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-black text-primary-dark">{consultation.queueNo}</p>
          <h3 className="mt-1 truncate font-heading text-lg font-bold text-text-main">{consultation.petName}</h3>
          <p className="truncate text-sm font-semibold text-text-secondary">{consultation.ownerName}</p>
        </div>
        <PriorityBadge priority={consultation.priority} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2"><StatusBadge status={consultation.status} /><span className="rounded-full bg-white/70 px-2 py-1 text-[11px] font-bold text-text-muted">{consultation.branch}</span></div>
      <dl className="mt-4 grid gap-2 text-sm text-text-secondary">
        <div className="flex justify-between gap-3"><dt>Service</dt><dd className="text-right font-bold text-text-main">{consultation.service}</dd></div>
        <div className="flex justify-between gap-3"><dt>Doctor</dt><dd className="text-right font-bold text-text-main">{consultation.doctor}</dd></div>
        <div className="flex justify-between gap-3"><dt>Vitals</dt><dd className="text-right font-bold text-text-main">{consultation.vitals.temperature}, {consultation.vitals.heartRate}</dd></div>
        <div className="flex justify-between gap-3"><dt>Updated</dt><dd className="text-right font-bold text-text-main">{consultation.lastUpdated}</dd></div>
      </dl>
      <button type="button" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white" onClick={() => onOpen?.(consultation)}>
        Open Workspace <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </article>
  );
}
