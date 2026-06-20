import { useEffect, useState } from "react";
import { CheckboxInput } from "@/components/forms/CheckboxInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

const initialForm = {
  branch: "DHA Branch",
  doctor: "Dr. Sara Malik",
  date: "2026-06-20",
  time: "17:30",
  serviceType: "Consultation",
  duration: "30",
  room: "Room 2",
  notes: "",
  sendConfirmation: true,
};

export function ConfirmRequestModal({ open, request, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (request) {
      setForm({
        ...initialForm,
        branch: request.preferredBranch,
        doctor: request.suggestedDoctor,
        date: request.preferredDate,
        time: request.preferredTime === "ASAP" ? "11:45" : request.preferredTime,
        serviceType: request.serviceType,
        notes: request.notes || "",
      });
    }
  }, [request]);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <FormModal
      open={open}
      title="Confirm Request"
      subtitle={request ? `${request.petName} - ${request.ownerName}` : "Confirm requested appointment."}
      onClose={onClose}
      footer={(
        <div className="flex flex-wrap justify-end gap-2">
          <ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton>
          <ActionButton type="submit" form="confirm-request-form">Confirm Appointment</ActionButton>
        </div>
      )}
    >
      <form id="confirm-request-form" className="grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
        <SelectInput label="Confirmed Branch" value={form.branch} onChange={(event) => updateField("branch", event.target.value)} options={["DHA Branch", "Gulberg Branch", "Model Town Branch", "Johar Town Branch", "Cantt Branch", "Bahria Branch"].map((item) => ({ label: item, value: item }))} />
        <SelectInput label="Confirmed Doctor" value={form.doctor} onChange={(event) => updateField("doctor", event.target.value)} options={["Dr. Sara Malik", "Dr. Ahmed Khan", "Dr. Hina Farooq", "Dr. Nadia Shah", "Dr. Usman Tariq", "Grooming Team"].map((item) => ({ label: item, value: item }))} />
        <TextInput label="Confirmed Date" type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} />
        <TextInput label="Confirmed Time" type="time" value={form.time} onChange={(event) => updateField("time", event.target.value)} />
        <TextInput label="Service Type" value={form.serviceType} onChange={(event) => updateField("serviceType", event.target.value)} />
        <SelectInput label="Estimated Duration" value={form.duration} onChange={(event) => updateField("duration", event.target.value)} options={["20", "30", "45", "60", "90"].map((item) => ({ label: `${item} minutes`, value: item }))} />
        <TextInput label="Room" value={form.room} onChange={(event) => updateField("room", event.target.value)} />
        <CheckboxInput label="Send confirmation to client" checked={form.sendConfirmation} onChange={(event) => updateField("sendConfirmation", event.target.checked)} />
        <TextAreaInput label="Notes" value={form.notes} onChange={(event) => updateField("notes", event.target.value)} />
      </form>
    </FormModal>
  );
}
