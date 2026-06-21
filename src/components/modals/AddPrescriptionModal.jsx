import { useEffect, useState } from "react";
import { PrescriptionBuilder } from "@/components/clinical/PrescriptionBuilder";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

export function AddPrescriptionModal({ open, prescription, onClose, onSubmit }) {
  const [draft, setDraft] = useState(prescription || { medicines: [{}] });

  useEffect(() => setDraft(prescription || { medicines: [{}] }), [prescription, open]);

  const submit = (event) => {
    event.preventDefault();
    onSubmit?.(draft);
  };

  return (
    <FormModal open={open} title={prescription?.id ? "Edit Prescription" : "New Prescription"} subtitle="Create a doctor prescription for pharmacy handoff." onClose={onClose}>
      <form className="space-y-5" onSubmit={submit}>
        <PrescriptionBuilder value={draft} onChange={setDraft} />
        <div className="flex justify-end gap-2">
          <ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton>
          <ActionButton type="submit">Save Prescription</ActionButton>
        </div>
      </form>
    </FormModal>
  );
}
