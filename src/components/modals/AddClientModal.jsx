import { useEffect, useState } from "react";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "Lahore",
  preferredBranch: "DHA Branch",
  emergencyContact: "",
  status: "active",
  notes: "",
};

export function AddClientModal({ open, client, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm(client ? { ...initialForm, ...client } : initialForm);
  }, [client, open]);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <FormModal
      open={open}
      title={client ? "Edit Client" : "Add Client"}
      subtitle="UI-only client setup. Backend persistence will be connected later."
      onClose={onClose}
      footer={<div className="flex flex-wrap justify-end gap-2"><ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton><ActionButton type="submit" form="client-form">{client ? "Save Changes" : "Add Client"}</ActionButton></div>}
    >
      <form id="client-form" className="grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
        <TextInput label="Full Name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
        <TextInput label="Phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required />
        <TextInput label="Email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
        <TextInput label="City" value={form.city} onChange={(event) => updateField("city", event.target.value)} />
        <TextInput label="Address" value={form.address} onChange={(event) => updateField("address", event.target.value)} className="md:col-span-2" />
        <SelectInput label="Preferred Branch" value={form.preferredBranch} onChange={(event) => updateField("preferredBranch", event.target.value)} options={["DHA Branch", "Gulberg Branch", "Model Town Branch", "Johar Town Branch", "Cantt Branch", "Bahria Branch"].map((item) => ({ label: item, value: item }))} />
        <SelectInput label="Client Status" value={form.status} onChange={(event) => updateField("status", event.target.value)} options={[{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }, { label: "Follow-up due", value: "follow_up_due" }, { label: "Pending payment", value: "pending_payment" }]} />
        <TextInput label="Emergency Contact" value={form.emergencyContact} onChange={(event) => updateField("emergencyContact", event.target.value)} className="md:col-span-2" />
        <TextAreaInput label="Notes" value={form.notes} onChange={(event) => updateField("notes", event.target.value)} />
      </form>
    </FormModal>
  );
}
