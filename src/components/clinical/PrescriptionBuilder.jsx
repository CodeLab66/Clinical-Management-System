import { Plus, Trash2 } from "lucide-react";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { CheckboxInput } from "@/components/forms/CheckboxInput";
import { ActionButton } from "@/components/ui/ActionButton";

const emptyMedicine = { name: "", dosage: "", frequency: "", duration: "", route: "", instructions: "", quantity: "" };

export function PrescriptionBuilder({ value, onChange }) {
  const prescription = value || { medicines: [emptyMedicine] };
  const medicines = prescription.medicines?.length ? prescription.medicines : [emptyMedicine];
  const update = (key, nextValue) => onChange?.({ ...prescription, [key]: nextValue });
  const updateMedicine = (index, key, nextValue) => {
    update("medicines", medicines.map((medicine, medicineIndex) => medicineIndex === index ? { ...medicine, [key]: nextValue } : medicine));
  };
  const addMedicine = () => update("medicines", [...medicines, emptyMedicine]);
  const removeMedicine = (index) => update("medicines", medicines.filter((_, medicineIndex) => medicineIndex !== index));

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <TextInput label="Pet" value={prescription.petName || ""} onChange={(event) => update("petName", event.target.value)} />
        <TextInput label="Owner" value={prescription.ownerName || ""} onChange={(event) => update("ownerName", event.target.value)} />
        <TextInput label="Doctor" value={prescription.doctor || ""} onChange={(event) => update("doctor", event.target.value)} />
        <TextInput label="Diagnosis" value={prescription.diagnosis || ""} onChange={(event) => update("diagnosis", event.target.value)} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading text-base font-bold text-text-main">Medicines</h3>
          <ActionButton icon={Plus} variant="ghost" onClick={addMedicine}>Add Medicine</ActionButton>
        </div>
        {medicines.map((medicine, index) => (
          <section key={index} className="rounded-[22px] border border-white/60 bg-white/45 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-text-main">Medicine {index + 1}</p>
              {medicines.length > 1 ? (
                <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-danger/10 text-danger" title="Remove medicine" onClick={() => removeMedicine(index)}>
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <TextInput label="Medicine name" value={medicine.name} onChange={(event) => updateMedicine(index, "name", event.target.value)} />
              <TextInput label="Dosage" value={medicine.dosage} onChange={(event) => updateMedicine(index, "dosage", event.target.value)} />
              <TextInput label="Frequency" value={medicine.frequency} onChange={(event) => updateMedicine(index, "frequency", event.target.value)} />
              <TextInput label="Duration" value={medicine.duration} onChange={(event) => updateMedicine(index, "duration", event.target.value)} />
              <TextInput label="Route" value={medicine.route} onChange={(event) => updateMedicine(index, "route", event.target.value)} />
              <TextInput label="Quantity" value={medicine.quantity} onChange={(event) => updateMedicine(index, "quantity", event.target.value)} />
              <TextAreaInput label="Instructions" rows={2} value={medicine.instructions} onChange={(event) => updateMedicine(index, "instructions", event.target.value)} />
            </div>
          </section>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <CheckboxInput label="Refill allowed" checked={Boolean(prescription.refillAllowed)} onChange={(event) => update("refillAllowed", event.target.checked)} />
        <TextInput label="Warnings" value={prescription.warnings || ""} onChange={(event) => update("warnings", event.target.value)} />
        <TextAreaInput label="Doctor notes" value={prescription.doctorNotes || ""} onChange={(event) => update("doctorNotes", event.target.value)} />
      </div>
    </div>
  );
}
