import { AlertCard } from "@/components/cards/AlertCard";

export function MedicalWarningCard({ allergies = [], chronicDiseases = [], warnings = [], biteHistory, specialNotes }) {
  const description = [
    allergies.length ? `Allergies: ${allergies.join(", ")}` : null,
    chronicDiseases.length ? `Chronic: ${chronicDiseases.join(", ")}` : null,
    biteHistory ? "Bite history reported" : null,
    warnings.length ? warnings.join(", ") : null,
    specialNotes,
  ].filter(Boolean).join(" · ");

  return <AlertCard severity={description ? "danger" : "neutral"} title="Medical warnings" description={description || "No active medical warnings."} />;
}
