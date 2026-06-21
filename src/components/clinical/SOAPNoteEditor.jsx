import { Wand2 } from "lucide-react";

const sections = [
  ["subjective", "Subjective", "Owner complaint, history, symptoms, appetite, behavior."],
  ["objective", "Objective", "Vitals, physical exam findings, lab observations."],
  ["assessment", "Assessment", "Diagnosis, differential diagnosis, severity."],
  ["plan", "Plan", "Treatment, medication, lab tests, follow-up instructions."],
];

const templates = {
  subjective: "Owner reports appetite, thirst, activity, and primary concern. Duration: ",
  objective: "Vitals reviewed. Physical exam findings: ",
  assessment: "Primary diagnosis and differentials: ",
  plan: "Treatment today, medication instructions, diagnostics, and follow-up: ",
};

export function SOAPNoteEditor({ value = {}, onChange, saved = true }) {
  const update = (key, nextValue) => onChange?.({ ...value, [key]: nextValue });
  const insertTemplate = (key) => update(key, `${value[key] || ""}${value[key] ? "\n" : ""}${templates[key]}`);

  return (
    <div className="grid gap-4 min-[900px]:grid-cols-2">
      {sections.map(([key, title, helper]) => (
        <section key={key} className="rounded-[22px] border border-white/60 bg-white/45 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-base font-bold text-text-main">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-text-muted">{helper}</p>
            </div>
            <button type="button" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/65 text-primary-dark transition hover:bg-primary-soft" title={`Insert ${title} template`} onClick={() => insertTemplate(key)}>
              <Wand2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <textarea
            className="orange-focus mt-4 min-h-36 w-full resize-y rounded-[20px] border border-white/60 bg-white/60 px-4 py-3 text-sm leading-6 text-text-main outline-none placeholder:text-text-muted"
            value={value[key] || ""}
            placeholder={helper}
            onChange={(event) => update(key, event.target.value)}
          />
          <p className={`mt-2 text-xs font-bold ${saved ? "text-success" : "text-warning"}`}>{saved ? "Draft saved locally" : "Unsaved local edits"}</p>
        </section>
      ))}
    </div>
  );
}
