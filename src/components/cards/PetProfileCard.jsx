import { StatusBadge } from "@/components/badges/StatusBadge";

const Section = ({ title, items = [] }) => (
  <section className="rounded-[20px] bg-white/45 p-4">
    <h3 className="font-heading text-sm font-bold text-text-main">{title}</h3>
    <div className="mt-3 space-y-2">
      {items.length ? items.map((item) => <p key={item} className="text-sm leading-6 text-text-secondary">{item}</p>) : <p className="text-sm text-text-muted">No records yet.</p>}
    </div>
  </section>
);

export function PetProfileCard({ pet }) {
  if (!pet) return null;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3 rounded-[20px] bg-white/45 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-black text-white">
            {pet.name.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <p className="font-heading text-xl font-bold text-text-main">{pet.name}</p>
            <p className="mt-1 text-sm font-semibold text-text-muted">{pet.petId} - {pet.species} / {pet.breed}</p>
            <p className="mt-1 text-sm text-text-secondary">Owner: {pet.ownerName}</p>
          </div>
        </div>
        <StatusBadge status={pet.medicalAlert} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Section title="Pet Identity" items={[`${pet.gender}, ${pet.age}`, `Weight: ${pet.weight}`, `Color: ${pet.color}`, `Microchip: ${pet.microchip}`, `Neutered/spayed: ${pet.neutered ? "Yes" : "No"}`]} />
        <Section title="Owner Details" items={[pet.ownerName, pet.branch]} />
        <Section title="Medical Alerts" items={[pet.medicalAlert, `Allergies: ${pet.allergies}`]} />
        <Section title="Preventive Care" items={[`Vaccination: ${pet.vaccineStatus}`, `Deworming: ${pet.dewormingStatus}`]} />
        <Section title="Visits" items={[`Last visit: ${pet.lastVisit}`, `Upcoming: ${pet.upcomingAppointment}`]} />
        <Section title="Basic Timeline" items={pet.timeline} />
      </div>
      <Section title="Notes" items={[pet.notes]} />
    </div>
  );
}
