import { useEffect, useState } from "react";
import { CheckboxInput } from "@/components/forms/CheckboxInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

const initialForm = {
  ownerName: "",
  petName: "",
  service: "Consultation",
  branch: "DHA Branch",
  doctor: "Dr. Sara Malik",
  date: "2026-06-20",
  time: "13:30",
  duration: "30",
  source: "Reception",
  priority: "normal",
  symptoms: "",
  notes: "",
  sendReminder: true,
};

export function AddAppointmentModal({ open, appointment, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm(appointment ? { ...initialForm, ...appointment, source: appointment.source || "Reception" } : initialForm);
  }, [appointment, open]);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <FormModal
      open={open}
      title={appointment ? "Edit Appointment" : "Add Appointment"}
      subtitle="UI-only appointment setup. Backend persistence will be connected later."
      onClose={onClose}
      footer={<div className="flex flex-wrap justify-end gap-2"><ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton><ActionButton type="submit" form="appointment-form">{appointment ? "Save Changes" : "Add Appointment"}</ActionButton></div>}
    >
      <form id="appointment-form" className="grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
        <TextInput label="Client" value={form.ownerName} onChange={(event) => updateField("ownerName", event.target.value)} required />
        <TextInput label="Pet" value={form.petName} onChange={(event) => updateField("petName", event.target.value)} required />
        <TextInput label="Service Type" value={form.service} onChange={(event) => updateField("service", event.target.value)} />
        <SelectInput label="Branch" value={form.branch} onChange={(event) => updateField("branch", event.target.value)} options={["DHA Branch", "Gulberg Branch", "Model Town Branch", "Johar Town Branch", "Cantt Branch", "Bahria Branch"].map((item) => ({ label: item, value: item }))} />
        <SelectInput label="Doctor" value={form.doctor} onChange={(event) => updateField("doctor", event.target.value)} options={["Dr. Sara Malik", "Dr. Ahmed Khan", "Dr. Hina Farooq", "Dr. Nadia Shah", "Dr. Usman Tariq", "Grooming Team"].map((item) => ({ label: item, value: item }))} />
        <TextInput label="Date" type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} />
        <TextInput label="Time" type="time" value={form.time} onChange={(event) => updateField("time", event.target.value)} />
        <SelectInput label="Duration" value={String(form.duration)} onChange={(event) => updateField("duration", event.target.value)} options={["20", "30", "45", "60", "90"].map((item) => ({ label: `${item} minutes`, value: item }))} />
        <SelectInput label="Appointment Source" value={form.source} onChange={(event) => updateField("source", event.target.value)} options={["Website Form", "WhatsApp", "Phone Call", "Walk-in", "Reception"].map((item) => ({ label: item, value: item }))} />
        <SelectInput label="Priority" value={form.priority} onChange={(event) => updateField("priority", event.target.value)} options={[{ label: "Normal", value: "normal" }, { label: "Urgent", value: "urgent" }, { label: "Critical", value: "critical" }]} />
        <TextAreaInput label="Symptoms / Reason" value={form.symptoms} onChange={(event) => updateField("symptoms", event.target.value)} />
        <TextAreaInput label="Notes" value={form.notes} onChange={(event) => updateField("notes", event.target.value)} />
        <CheckboxInput label="Send reminder" checked={form.sendReminder} onChange={(event) => updateField("sendReminder", event.target.checked)} />
      </form>
    </FormModal>
  );
}
