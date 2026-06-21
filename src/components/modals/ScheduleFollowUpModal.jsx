import { useEffect, useState } from "react";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

const reasons = ["Vaccine booster", "Deworming", "Surgery recheck", "Lab result review", "Medication review", "Chronic disease monitoring", "Emergency follow-up"];

export function ScheduleFollowUpModal({ open, source, onClose, onSubmit }) {
  const [form, setForm] = useState({ reason: reasons[0], priority: "normal", status: "scheduled" });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    setForm({
      petName: source?.petName || "",
      ownerName: source?.ownerName || "",
      doctor: source?.doctor || "",
      branch: source?.branch || "",
      relatedVisit: source?.service || source?.relatedVisit || "",
      reason: source?.reason || reasons[0],
      dueDate: source?.dueDate || "",
      priority: source?.priority || "normal",
      status: "scheduled",
      notes: source?.notes || "",
    });
  }, [source, open]);

  const submit = (event) => {
    event.preventDefault();
    onSubmit?.(form);
  };

  return (
    <FormModal open={open} title="Schedule Follow-up" subtitle="Plan clinical recall or recheck." onClose={onClose}>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={submit}>
        <TextInput label="Pet" value={form.petName || ""} onChange={(event) => update("petName", event.target.value)} />
        <TextInput label="Owner" value={form.ownerName || ""} onChange={(event) => update("ownerName", event.target.value)} />
        <SelectInput label="Reason" value={form.reason} onChange={(event) => update("reason", event.target.value)} options={reasons.map((reason) => ({ label: reason, value: reason }))} />
        <TextInput label="Related visit" value={form.relatedVisit || ""} onChange={(event) => update("relatedVisit", event.target.value)} />
        <TextInput label="Doctor" value={form.doctor || ""} onChange={(event) => update("doctor", event.target.value)} />
        <TextInput label="Due date" type="date" value={form.dueDate || ""} onChange={(event) => update("dueDate", event.target.value)} />
        <SelectInput label="Priority" value={form.priority} onChange={(event) => update("priority", event.target.value)} options={["normal", "urgent", "critical"].map((value) => ({ label: value, value }))} />
        <TextInput label="Branch" value={form.branch || ""} onChange={(event) => update("branch", event.target.value)} />
        <TextAreaInput label="Notes" value={form.notes || ""} onChange={(event) => update("notes", event.target.value)} />
        <div className="flex justify-end gap-2 md:col-span-2">
          <ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton>
          <ActionButton type="submit">Schedule</ActionButton>
        </div>
      </form>
    </FormModal>
  );
}
