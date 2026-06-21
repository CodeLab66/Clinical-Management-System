import { useEffect, useState } from "react";
import { TextInput } from "@/components/forms/TextInput";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

const fields = [
  ["temperature", "Temperature"],
  ["weight", "Weight"],
  ["heartRate", "Heart Rate"],
  ["respiratoryRate", "Respiratory Rate"],
  ["hydration", "Hydration"],
  ["painScore", "Pain Score"],
  ["bodyConditionScore", "Body Condition Score"],
];

export function AddVitalsModal({ open, vitals, onClose, onSubmit }) {
  const [form, setForm] = useState(vitals || {});

  useEffect(() => setForm(vitals || {}), [vitals, open]);

  const submit = (event) => {
    event.preventDefault();
    onSubmit?.(form);
  };

  return (
    <FormModal open={open} title="Add / Edit Vitals" subtitle="Update consultation observations." onClose={onClose}>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={submit}>
        {fields.map(([key, label]) => <TextInput key={key} label={label} value={form[key] || ""} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} />)}
        <div className="flex justify-end gap-2 md:col-span-2">
          <ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton>
          <ActionButton type="submit">Save Vitals</ActionButton>
        </div>
      </form>
    </FormModal>
  );
}
