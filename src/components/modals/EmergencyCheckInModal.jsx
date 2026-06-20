import { useState } from "react";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

const initialForm = {
  phone: "",
  ownerName: "",
  petName: "",
  species: "Dog",
  emergencyReason: "",
  severity: "High",
  branch: "DHA Branch",
  doctor: "Dr. Sara Malik",
  notes: "",
};

export function EmergencyCheckInModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <FormModal
      open={open}
      title="Emergency Check-in"
      subtitle="Create an urgent queue item for immediate triage."
      onClose={onClose}
      footer={<div className="flex flex-wrap justify-end gap-2"><ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton><ActionButton type="submit" form="emergency-form">Add to Queue</ActionButton></div>}
    >
      <form id="emergency-form" className="grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); onSubmit(form); setForm(initialForm); }}>
        <TextInput label="Owner Phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required />
        <TextInput label="Owner Name" value={form.ownerName} onChange={(event) => updateField("ownerName", event.target.value)} required />
        <TextInput label="Pet Name" value={form.petName} onChange={(event) => updateField("petName", event.target.value)} required />
        <SelectInput label="Species" value={form.species} onChange={(event) => updateField("species", event.target.value)} options={["Dog", "Cat", "Rabbit", "Parrot", "Other"].map((item) => ({ label: item, value: item }))} />
        <SelectInput label="Severity" value={form.severity} onChange={(event) => updateField("severity", event.target.value)} options={["Critical", "High", "Medium", "Stable"].map((item) => ({ label: item, value: item }))} />
        <SelectInput label="Branch" value={form.branch} onChange={(event) => updateField("branch", event.target.value)} options={["DHA Branch", "Gulberg Branch", "Model Town Branch", "Johar Town Branch", "Cantt Branch", "Bahria Branch"].map((item) => ({ label: item, value: item }))} />
        <SelectInput label="Assigned Doctor" value={form.doctor} onChange={(event) => updateField("doctor", event.target.value)} options={["Dr. Sara Malik", "Dr. Ahmed Khan", "Dr. Hina Farooq", "Dr. Nadia Shah", "Dr. Usman Tariq"].map((item) => ({ label: item, value: item }))} />
        <TextAreaInput label="Emergency Reason" value={form.emergencyReason} onChange={(event) => updateField("emergencyReason", event.target.value)} required />
        <TextAreaInput label="Notes" value={form.notes} onChange={(event) => updateField("notes", event.target.value)} />
      </form>
    </FormModal>
  );
}
