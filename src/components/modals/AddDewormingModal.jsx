import { useState } from "react";
import { CheckboxInput } from "@/components/forms/CheckboxInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

export function AddDewormingModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ reminderEnabled: true });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    onSubmit?.({ ...form, vaccineOrDewormer: form.dewormerName });
    setForm({ reminderEnabled: true });
  };

  return (
    <FormModal open={open} title="Add Deworming Record" subtitle="Record deworming dose and next recall." onClose={onClose}>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={submit}>
        <TextInput label="Pet" value={form.petName || ""} onChange={(event) => update("petName", event.target.value)} required />
        <TextInput label="Owner" value={form.ownerName || ""} onChange={(event) => update("ownerName", event.target.value)} />
        <TextInput label="Dewormer name" value={form.dewormerName || ""} onChange={(event) => update("dewormerName", event.target.value)} required />
        <TextInput label="Dosage" value={form.dosage || ""} onChange={(event) => update("dosage", event.target.value)} />
        <TextInput label="Weight" value={form.weight || ""} onChange={(event) => update("weight", event.target.value)} />
        <TextInput label="Date given" type="date" value={form.lastGiven || ""} onChange={(event) => update("lastGiven", event.target.value)} />
        <TextInput label="Next due date" type="date" value={form.nextDue || ""} onChange={(event) => update("nextDue", event.target.value)} />
        <TextInput label="Doctor" value={form.doctor || ""} onChange={(event) => update("doctor", event.target.value)} />
        <TextInput label="Branch" value={form.branch || ""} onChange={(event) => update("branch", event.target.value)} />
        <TextAreaInput label="Notes" value={form.notes || ""} onChange={(event) => update("notes", event.target.value)} />
        <CheckboxInput label="Reminder enabled" checked={Boolean(form.reminderEnabled)} onChange={(event) => update("reminderEnabled", event.target.checked)} />
        <div className="flex justify-end gap-2 md:col-span-2">
          <ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton>
          <ActionButton type="submit">Save Deworming</ActionButton>
        </div>
      </form>
    </FormModal>
  );
}
