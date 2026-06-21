const fields = [
  ["treatmentGiven", "Treatment Given"],
  ["procedures", "Procedures Performed"],
  ["medicationPlan", "Medication Plan"],
  ["dietAdvice", "Diet Advice"],
  ["homeCare", "Home Care Instructions"],
  ["followUpDate", "Follow-up Date"],
];

export function TreatmentPlanPanel({ plan = {}, onChange }) {
  const update = (key, value) => onChange?.({ ...plan, [key]: value });

  return (
    <section className="rounded-[22px] border border-white/60 bg-white/45 p-4">
      <h3 className="font-heading text-base font-bold text-text-main">Treatment Plan</h3>
      <p className="mt-1 text-xs text-text-muted">Care delivered, next steps, and home instructions.</p>
      <div className="mt-4 grid gap-3 min-[900px]:grid-cols-2">
        {fields.map(([key, label]) => (
          <label key={key} className={key === "homeCare" ? "min-[900px]:col-span-2" : ""}>
            <span className="mb-2 block text-xs font-bold text-text-muted">{label}</span>
            {key === "homeCare" ? (
              <textarea className="orange-focus min-h-24 w-full rounded-[20px] border border-white/60 bg-white/60 px-4 py-3 text-sm text-text-main outline-none" value={plan[key] || ""} onChange={(event) => update(key, event.target.value)} />
            ) : (
              <input className="orange-focus min-h-11 w-full rounded-full border border-white/60 bg-white/60 px-4 text-sm text-text-main outline-none" value={plan[key] || ""} onChange={(event) => update(key, event.target.value)} />
            )}
          </label>
        ))}
      </div>
    </section>
  );
}
