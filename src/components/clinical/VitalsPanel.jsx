import { Activity, Edit3 } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";

const vitalLabels = {
  temperature: "Temperature",
  weight: "Weight",
  heartRate: "Heart Rate",
  respiratoryRate: "Respiratory Rate",
  hydration: "Hydration",
  painScore: "Pain Score",
  bodyConditionScore: "Body Condition",
};

export function VitalsPanel({ vitals = {}, onEdit }) {
  return (
    <section className="rounded-[22px] border border-white/60 bg-white/45 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 font-heading text-base font-bold text-text-main"><Activity className="h-4 w-4 text-primary-dark" aria-hidden="true" />Vitals</h3>
          <p className="mt-1 text-xs text-text-muted">Latest recorded clinical observations.</p>
        </div>
        {onEdit ? <ActionButton icon={Edit3} variant="ghost" onClick={onEdit}>Edit</ActionButton> : null}
      </div>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {Object.entries(vitalLabels).map(([key, label]) => (
          <div key={key} className="rounded-[18px] bg-white/55 p-3">
            <dt className="text-[11px] font-bold uppercase text-text-muted">{label}</dt>
            <dd className="mt-1 text-sm font-bold text-text-main">{vitals[key] || "Pending"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
