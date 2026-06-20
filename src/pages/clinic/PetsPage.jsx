import { useEffect, useMemo, useState } from "react";
import { Cat, Dog, Download, Feather, Filter, PawPrint, Plus, Syringe, TriangleAlert } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { GlassCard } from "@/components/cards/GlassCard";
import { PetProfileCard } from "@/components/cards/PetProfileCard";
import { StatCard } from "@/components/cards/StatCard";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { SearchInput } from "@/components/forms/SearchInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { AddPetModal } from "@/components/modals/AddPetModal";
import { FormModal } from "@/components/modals/FormModal";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { PetTable } from "@/components/tables/PetTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { petKpis } from "@/data/mockPets";
import { clientService } from "@/services/clientService";
import { petService } from "@/services/petService";

const iconMap = { Cat, Dog, Feather, PawPrint, Syringe, TriangleAlert };

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("All species");
  const [breed, setBreed] = useState("All breeds");
  const [branch, setBranch] = useState("All branches");
  const [vaccine, setVaccine] = useState("All vaccines");
  const [alert, setAlert] = useState("All alerts");
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    Promise.all([petService.getPets(), clientService.getClients()]).then(([petData, clientData]) => {
      setPets(petData);
      setClients(clientData);
      setLoading(false);
    });
  }, []);

  const speciesOptions = useMemo(() => ["All species", ...new Set(pets.map((pet) => pet.species))], [pets]);
  const breedOptions = useMemo(() => ["All breeds", ...new Set(pets.map((pet) => pet.breed))], [pets]);
  const branchOptions = useMemo(() => ["All branches", ...new Set(pets.map((pet) => pet.branch))], [pets]);

  const filteredPets = useMemo(() => pets.filter((pet) => {
    const haystack = [pet.name, pet.ownerName, pet.microchip].join(" ").toLowerCase();
    return haystack.includes(search.toLowerCase())
      && (species === "All species" || pet.species === species)
      && (breed === "All breeds" || pet.breed === breed)
      && (branch === "All branches" || pet.branch === branch)
      && (vaccine === "All vaccines" || pet.vaccineStatus === vaccine)
      && (alert === "All alerts" || pet.medicalAlert === alert);
  }), [alert, branch, breed, pets, search, species, vaccine]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (pet) => {
    setEditing(pet);
    setModalOpen(true);
  };

  const submitPet = async (payload) => {
    if (editing) {
      const updated = await petService.updatePet(editing.id, { ...editing, ...payload });
      setPets((current) => current.map((pet) => pet.id === editing.id ? updated : pet));
      setNotice(`${updated.name} updated.`);
    } else {
      const owner = clients.find((client) => client.name === payload.ownerName);
      const created = await petService.createPet({ ...payload, ownerId: owner?.id, branch: owner?.preferredBranch || payload.branch || "DHA Branch" });
      setPets((current) => [created, ...current]);
      setNotice(`${created.name} added.`);
    }
    setModalOpen(false);
  };

  const addAlert = async (pet) => {
    const nextAlert = pet.medicalAlert === "aggressive" ? "allergy" : "aggressive";
    const updated = await petService.addMedicalAlert(pet.id, { medicalAlert: nextAlert, note: "Added locally from table action." });
    setPets((current) => current.map((item) => item.id === pet.id ? { ...item, ...updated } : item));
    setNotice(`${pet.name} medical alert updated.`);
  };

  if (loading) {
    return <PageContainer className="space-y-4"><LoadingSkeleton className="min-h-[116px]" /><LoadingSkeleton variant="table" /></PageContainer>;
  }

  return (
    <PageContainer className="space-y-5">
      <PageHeader
        title="Pets"
        subtitle="Manage pet profiles, ownership, species, breed, age, and medical alerts."
        actions={<><ActionButton icon={Plus} onClick={openCreate}>Add Pet</ActionButton><ActionButton icon={Download} variant="ghost">Export</ActionButton><ActionButton icon={Filter} variant="ghost">Filter</ActionButton></>}
      />
      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {petKpis.map((item) => {
          const Icon = iconMap[item.icon] || PawPrint;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard>
        <div className="grid gap-3 md:grid-cols-2 min-[900px]:grid-cols-6">
          <SearchInput placeholder="Search pet, owner, microchip" value={search} onChange={(event) => setSearch(event.target.value)} className="min-[900px]:col-span-2" />
          <SelectInput label="Species" value={species} onChange={(event) => setSpecies(event.target.value)} options={speciesOptions.map((item) => ({ label: item, value: item }))} />
          <SelectInput label="Breed" value={breed} onChange={(event) => setBreed(event.target.value)} options={breedOptions.map((item) => ({ label: item, value: item }))} />
          <SelectInput label="Branch" value={branch} onChange={(event) => setBranch(event.target.value)} options={branchOptions.map((item) => ({ label: item, value: item }))} />
          <SelectInput label="Vaccination Due" value={vaccine} onChange={(event) => setVaccine(event.target.value)} options={["All vaccines", "Current", "Due soon", "Overdue", "Unknown", "Not applicable"].map((item) => ({ label: item, value: item }))} />
          <SelectInput label="Medical Alert" value={alert} onChange={(event) => setAlert(event.target.value)} options={[{ label: "All alerts", value: "All alerts" }, { label: "Allergy", value: "allergy" }, { label: "Chronic condition", value: "chronic_condition" }, { label: "Aggressive", value: "aggressive" }, { label: "Senior pet", value: "senior_pet" }, { label: "None", value: "none" }]} />
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-1 min-[900px]:grid-cols-2 xl:grid-cols-4">
        {filteredPets.slice(0, 8).map((pet) => (
          <button key={pet.id} type="button" className="rounded-[22px] border border-white/65 bg-white/65 p-4 text-left shadow-soft transition hover:bg-white/85" onClick={() => setProfile(pet)}>
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-black text-white">{pet.name.slice(0, 2).toUpperCase()}</span>
              <StatusBadge status={pet.medicalAlert} />
            </div>
            <h3 className="mt-3 truncate font-heading text-lg font-bold text-text-main">{pet.name}</h3>
            <p className="mt-1 truncate text-sm font-semibold text-text-secondary">{pet.species} - {pet.breed}</p>
            <div className="mt-3 space-y-1 text-xs text-text-muted">
              <p>{pet.gender} - {pet.age} - {pet.weight}</p>
              <p className="truncate">Owner: {pet.ownerName}</p>
              <p>Vaccine: {pet.vaccineStatus}</p>
              <p>Last: {pet.lastVisit}</p>
              <p className="truncate">Next: {pet.upcomingAppointment}</p>
            </div>
          </button>
        ))}
      </div>

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Pet Directory</h2>
          <p className="mt-1 text-sm text-text-secondary">Medical identity data, alerts, preventive care, and owner linkage.</p>
        </div>
        {filteredPets.length ? <PetTable pets={filteredPets} onView={setProfile} onEdit={openEdit} onAlert={addAlert} /> : <EmptyState title="No pets found" description="Try adjusting search or filters." />}
      </GlassCard>

      <FormModal open={Boolean(profile)} title="Pet Profile" subtitle={profile?.petId} onClose={() => setProfile(null)}>
        <PetProfileCard pet={profile} />
      </FormModal>
      <AddPetModal open={modalOpen} pet={editing} clients={clients} onClose={() => setModalOpen(false)} onSubmit={submitPet} />
    </PageContainer>
  );
}
