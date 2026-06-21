import { useState } from "react";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

export function CompleteConsultationModal({ open, consultation, onClose, onSubmit }) {
  const [summary, setSummary] = useState("");

  const submit = (event) => {
    event.preventDefault();
    onSubmit?.({ dischargeSummary: summary || `${consultation?.petName || "Patient"} consultation completed.` });
    setSummary("");
  };

  return (
    <FormModal open={open} title="Complete Consultation" subtitle={consultation ? `${consultation.petName} - ${consultation.ownerName}` : ""} onClose={onClose}>
      <form className="space-y-4" onSubmit={submit}>
        <TextAreaInput label="Discharge summary" value={summary} onChange={(event) => setSummary(event.target.value)} />
        <div className="rounded-[20px] bg-warning/10 p-4 text-sm font-semibold leading-6 text-text-secondary">Completing will update this consultation locally to completed. Backend sign-off can be connected later.</div>
        <div className="flex justify-end gap-2">
          <ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton>
          <ActionButton type="submit">Complete Consultation</ActionButton>
        </div>
      </form>
    </FormModal>
  );
}
