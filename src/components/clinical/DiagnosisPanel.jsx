import { Tags } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";

export function DiagnosisPanel({ diagnosis = {}, onChange }) {
  const update = (key, value) => onChange?.({ ...diagnosis, [key]: value });
  const differentials = Array.isArray(diagnosis.differentials) ? diagnosis.differentials.join(", ") : diagnosis.differentials || "";
  const tags = Array.isArray(diagnosis.tags) ? diagnosis.tags.join(", ") : diagnosis.tags || "";

  return (
    <section className="rounded-[22px] border border-white/60 bg-white/45 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-base font-bold text-text-main">Diagnosis</h3>
          <p className="mt-1 text-xs text-text-muted">Clinical assessment and diagnostic tags.</p>
        </div>
        <PriorityBadge priority={diagnosis.severity || "normal"} />
      </div>
      <div className="mt-4 grid gap-3">
        <input className="orange-focus min-h-11 rounded-full border border-white/60 bg-white/60 px-4 text-sm text-text-main outline-none" value={diagnosis.primary || ""} placeholder="Primary diagnosis" onChange={(event) => update("primary", event.target.value)} />
        <input className="orange-focus min-h-11 rounded-full border border-white/60 bg-white/60 px-4 text-sm text-text-main outline-none" value={differentials} placeholder="Differential diagnoses" onChange={(event) => update("differentials", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} />
        <input className="orange-focus min-h-11 rounded-full border border-white/60 bg-white/60 px-4 text-sm text-text-main outline-none" value={tags} placeholder="Clinical tags" onChange={(event) => update("tags", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} />
        <textarea className="orange-focus min-h-24 rounded-[20px] border border-white/60 bg-white/60 px-4 py-3 text-sm text-text-main outline-none" value={diagnosis.notes || ""} placeholder="Diagnosis notes" onChange={(event) => update("notes", event.target.value)} />
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs font-bold text-text-muted"><Tags className="h-3.5 w-3.5" aria-hidden="true" />{tags || "No tags yet"}</div>
    </section>
  );
}
