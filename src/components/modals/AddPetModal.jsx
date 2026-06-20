import { useEffect, useState } from "react";
import { CheckboxInput } from "@/components/forms/CheckboxInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { FormModal } from "@/components/modals/FormModal";
import { ActionButton } from "@/components/ui/ActionButton";

const initialForm = {
  name: "",
  ownerName: "",
  species: "Dog",
  breed: "",
  gender: "Male",
  dateOfBirth: "",
  age: "",
  weight: "",
  color: "",
  microchip: "",
  neutered: false,
  allergies: "",
  medicalAlert: "none",
  notes: "",
  branch: "DHA Branch",
};

export function AddPetModal({ open, pet, clients = [], onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm(pet ? { ...initialForm, ...pet, color: pet.color || "", microchip: pet.microchip || "" } : initialForm);
  }, [pet, open]);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const ownerOptions = clients.length ? clients.map((client) => ({ label: client.name, value: client.name })) : [{ label: "Walk-in Client", value: "Walk-in Client" }];

  return (
    <FormModal
      open={open}
      title={pet ? "Edit Pet" : "Add Pet"}
      subtitle="UI-only pet profile. Backend persistence will be connected later."
      onClose={onClose}
      footer={<div className="flex flex-wrap justify-end gap-2"><ActionButton variant="ghost" onClick={onClose}>Cancel</ActionButton><ActionButton type="submit" form="pet-form">{pet ? "Save Changes" : "Add Pet"}</ActionButton></div>}
    >
      <form id="pet-form" className="grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
        <TextInput label="Pet Name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
        <SelectInput label="Owner" value={form.ownerName} onChange={(event) => updateField("ownerName", event.target.value)} options={[{ label: "Select owner", value: "" }, ...ownerOptions]} />
        <SelectInput label="Species" value={form.species} onChange={(event) => updateField("species", event.target.value)} options={["Dog", "Cat", "Rabbit", "Hamster", "Parrot", "Other"].map((item) => ({ label: item, value: item }))} />
        <TextInput label="Breed" value={form.breed} onChange={(event) => updateField("breed", event.target.value)} />
        <SelectInput label="Gender" value={form.gender} onChange={(event) => updateField("gender", event.target.value)} options={["Male", "Female", "Unknown"].map((item) => ({ label: item, value: item }))} />
        <TextInput label="Date of Birth" type="date" value={form.dateOfBirth} onChange={(event) => updateField("dateOfBirth", event.target.value)} />
        <TextInput label="Age" value={form.age} onChange={(event) => updateField("age", event.target.value)} />
        <TextInput label="Weight" value={form.weight} onChange={(event) => updateField("weight", event.target.value)} />
        <TextInput label="Color / Markings" value={form.color} onChange={(event) => updateField("color", event.target.value)} />
        <TextInput label="Microchip Number" value={form.microchip} onChange={(event) => updateField("microchip", event.target.value)} />
        <SelectInput label="Medical Alerts" value={form.medicalAlert} onChange={(event) => updateField("medicalAlert", event.target.value)} options={[{ label: "None", value: "none" }, { label: "Allergy", value: "allergy" }, { label: "Chronic condition", value: "chronic_condition" }, { label: "Aggressive", value: "aggressive" }, { label: "Senior pet", value: "senior_pet" }]} />
        <TextInput label="Allergies" value={form.allergies} onChange={(event) => updateField("allergies", event.target.value)} />
        <CheckboxInput label="Neutered / spayed" checked={form.neutered} onChange={(event) => updateField("neutered", event.target.checked)} />
        <TextAreaInput label="Notes" value={form.notes} onChange={(event) => updateField("notes", event.target.value)} />
      </form>
    </FormModal>
  );
}
