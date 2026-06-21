import { useState } from "react";
import { CheckboxInput } from "@/components/forms/CheckboxInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

export function AddVaccinationModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ reminderEnabled: true });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    onSubmit?.({ ...form, vaccineOrDewormer: form.vaccineName });
    setForm({ reminderEnabled: true });
  };

  return (
    <FormModal open={open} title="Add Vaccine Record" subtitle="Record vaccine details and next recall." onClose={onClose}>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={submit}>
        <TextInput label="Pet" value={form.petName || ""} onChange={(event) => update("petName", event.target.value)} required />
        <TextInput label="Owner" value={form.ownerName || ""} onChange={(event) => update("ownerName", event.target.value)} />
        <TextInput label="Vaccine name" value={form.vaccineName || ""} onChange={(event) => update("vaccineName", event.target.value)} required />
        <TextInput label="Batch number" value={form.batchNumber || ""} onChange={(event) => update("batchNumber", event.target.value)} />
        <TextInput label="Date given" type="date" value={form.lastGiven || ""} onChange={(event) => update("lastGiven", event.target.value)} />
        <TextInput label="Next due date" type="date" value={form.nextDue || ""} onChange={(event) => update("nextDue", event.target.value)} />
        <TextInput label="Doctor" value={form.doctor || ""} onChange={(event) => update("doctor", event.target.value)} />
        <TextInput label="Branch" value={form.branch || ""} onChange={(event) => update("branch", event.target.value)} />
        <TextAreaInput label="Notes" value={form.notes || ""} onChange={(event) => update("notes", event.target.value)} />
        <CheckboxInput label="Reminder enabled" checked={Boolean(form.reminderEnabled)} onChange={(event) => update("reminderEnabled", event.target.checked)} />
        <div className="flex justify-end gap-2 md:col-span-2">
          <ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton>
          <ActionButton type="submit">Save Vaccine</ActionButton>
        </div>
      </form>
    </FormModal>
  );
}
