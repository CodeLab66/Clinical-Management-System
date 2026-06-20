import { useEffect, useState } from "react";
import { CheckboxInput } from "@/components/forms/CheckboxInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

export function RescheduleAppointmentModal({ open, appointment, onClose, onSubmit }) {
  const [form, setForm] = useState({ date: "2026-06-21", time: "10:00", reason: "", notifyClient: true });

  useEffect(() => {
    if (appointment) setForm({ date: appointment.date, time: appointment.time, reason: "", notifyClient: true });
  }, [appointment]);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <FormModal
      open={open}
      title="Reschedule Appointment"
      subtitle={appointment ? `${appointment.petName} - ${appointment.ownerName}` : "Choose a new slot."}
      onClose={onClose}
      footer={<div className="flex flex-wrap justify-end gap-2"><ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton><ActionButton type="submit" form="reschedule-form">Reschedule</ActionButton></div>}
    >
      <form id="reschedule-form" className="grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
        <TextInput label="New Date" type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} />
        <TextInput label="New Time" type="time" value={form.time} onChange={(event) => updateField("time", event.target.value)} />
        <TextAreaInput label="Reason" value={form.reason} onChange={(event) => updateField("reason", event.target.value)} />
        <CheckboxInput label="Notify client" checked={form.notifyClient} onChange={(event) => updateField("notifyClient", event.target.checked)} />
      </form>
    </FormModal>
  );
}
