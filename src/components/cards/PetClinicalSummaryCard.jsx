import { PawPrint } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";

export function PetClinicalSummaryCard({ consultation }) {
  if (!consultation) return null;
  const summary = consultation.petSummary || {};

  return (
    <section className="rounded-[22px] border border-white/60 bg-white/45 p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white"><PawPrint className="h-5 w-5" aria-hidden="true" /></span>
        <div className="min-w-0">
          <h3 className="truncate font-heading text-lg font-bold text-text-main">{consultation.petName}</h3>
          <p className="mt-1 text-sm font-semibold text-text-secondary">{consultation.species} - {consultation.breed}</p>
        </div>
      </div>
      <dl className="mt-4 grid gap-2 text-sm text-text-secondary">
        {[
          ["Gender", consultation.gender],
          ["Age", consultation.age],
          ["Weight", consultation.weight],
          ["Owner", consultation.ownerName],
          ["Allergies", summary.allergies],
          ["Chronic", summary.chronicConditions],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3"><dt>{label}</dt><dd className="text-right font-bold text-text-main">{value || "None"}</dd></div>
        ))}
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        <StatusBadge status={summary.vaccinationStatus || "none"} />
        <StatusBadge status={summary.dewormingStatus || "none"} />
        {(summary.flags || []).map((flag) => <span key={flag} className="rounded-full bg-danger/10 px-2 py-1 text-[11px] font-bold text-danger">{flag}</span>)}
      </div>
    </section>
  );
}
