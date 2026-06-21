import { useEffect, useMemo, useState } from "react";
import { CalendarClock, CheckCircle2, Download, Filter, PhoneMissed, Pill, Syringe, TriangleAlert } from "lucide-react";
import { VaccinationRecordCard } from "@/components/clinical/VaccinationRecordCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { SearchInput } from "@/components/forms/SearchInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { AddDewormingModal } from "@/components/modals/AddDewormingModal";
import { AddVaccinationModal } from "@/components/modals/AddVaccinationModal";
import { VaccinationTable } from "@/components/tables/VaccinationTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { vaccinationKpis } from "@/data/mockVaccinationDeworming";
import { vaccinationService } from "@/services/vaccinationService";

const iconMap = { CalendarClock, CheckCircle2, PhoneMissed, Pill, Syringe, TriangleAlert };
const option = (value) => ({ label: value, value });

export default function VaccinationDewormingPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vaccineOpen, setVaccineOpen] = useState(false);
  const [dewormingOpen, setDewormingOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("All species");
  const [type, setType] = useState("All types");
  const [status, setStatus] = useState("All statuses");
  const [branch, setBranch] = useState("All branches");

  useEffect(() => {
    vaccinationService.getVaccinationRecords().then((data) => {
      setRecords(data);
      setLoading(false);
    });
  }, []);

  const options = useMemo(() => ({
    species: ["All species", ...new Set(records.map((record) => record.species))],
    types: ["All types", ...new Set(records.map((record) => record.type))],
    statuses: ["All statuses", ...new Set(records.map((record) => record.status))],
    branches: ["All branches", ...new Set(records.map((record) => record.branch))],
  }), [records]);

  const filtered = useMemo(() => records.filter((record) => {
    const haystack = [record.petName, record.ownerName, record.vaccineOrDewormer].join(" ").toLowerCase();
    return haystack.includes(search.toLowerCase())
      && (species === "All species" || record.species === species)
      && (type === "All types" || record.type === type)
      && (status === "All statuses" || record.status === status)
      && (branch === "All branches" || record.branch === branch);
  }), [branch, records, search, species, status, type]);

  const addVaccine = async (payload) => {
    const created = await vaccinationService.createVaccinationRecord(payload);
    setRecords((current) => [created, ...current]);
    setVaccineOpen(false);
    setNotice(`Vaccine record added for ${created.petName}.`);
  };
  const addDeworming = async (payload) => {
    const created = await vaccinationService.createDewormingRecord(payload);
    setRecords((current) => [created, ...current]);
    setDewormingOpen(false);
    setNotice(`Deworming record added for ${created.petName}.`);
  };
  const markGiven = async (record) => {
    const updated = await vaccinationService.markVaccineGiven(record.id, { lastGiven: "Today" });
    setRecords((current) => current.map((item) => item.id === record.id ? { ...item, ...updated } : item));
    setNotice(`${record.vaccineOrDewormer} marked given for ${record.petName}.`);
  };
  const scheduleReminder = async (record) => {
    const updated = await vaccinationService.scheduleVaccineReminder(record.id, { status: "scheduled" });
    setRecords((current) => current.map((item) => item.id === record.id ? { ...item, ...updated } : item));
    setNotice(`Reminder scheduled for ${record.petName}.`);
  };

  if (loading) return <PageContainer className="space-y-4"><LoadingSkeleton className="min-h-[116px]" /><LoadingSkeleton variant="table" /></PageContainer>;

  return (
    <PageContainer className="space-y-5">
      <PageHeader title="Vaccination & Deworming" subtitle="Track vaccine schedules, deworming records, due reminders, and missed recalls." actions={<><ActionButton icon={Syringe} onClick={() => setVaccineOpen(true)}>Add Vaccine Record</ActionButton><ActionButton icon={Pill} variant="ghost" onClick={() => setDewormingOpen(true)}>Add Deworming Record</ActionButton><ActionButton icon={Download} variant="ghost">Export</ActionButton><ActionButton icon={Filter} variant="ghost">Filter</ActionButton></>} />
      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {vaccinationKpis.map((item) => {
          const Icon = iconMap[item.icon] || Syringe;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard>
        <div className="grid gap-3 md:grid-cols-2 min-[900px]:grid-cols-6">
          <SearchInput placeholder="Search pet or owner" value={search} onChange={(event) => setSearch(event.target.value)} className="min-[900px]:col-span-2" />
          <SelectInput label="Species" value={species} onChange={(event) => setSpecies(event.target.value)} options={options.species.map(option)} />
          <SelectInput label="Vaccine type" value={type} onChange={(event) => setType(event.target.value)} options={options.types.map(option)} />
          <SelectInput label="Due status" value={status} onChange={(event) => setStatus(event.target.value)} options={options.statuses.map(option)} />
          <SelectInput label="Branch" value={branch} onChange={(event) => setBranch(event.target.value)} options={options.branches.map(option)} />
          <label className="block"><span className="mb-2 block text-sm font-bold text-text-main">Date range</span><input className="orange-focus min-h-11 w-full rounded-full border border-white/60 bg-white/55 px-4 text-sm text-text-main outline-none" type="date" /></label>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-1 min-[900px]:grid-cols-2 xl:grid-cols-4">
        {filtered.slice(0, 4).map((record) => <VaccinationRecordCard key={record.id} record={record} onMarkGiven={markGiven} onReminder={scheduleReminder} />)}
      </div>

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Due and Overdue List</h2>
          <p className="mt-1 text-sm text-text-secondary">Preventive care recall queue across vaccines and deworming.</p>
        </div>
        <VaccinationTable records={filtered} onMarkGiven={markGiven} onReminder={scheduleReminder} onView={(record) => setNotice(`Viewing ${record.petName}.`)} onEdit={(record) => setNotice(`Editing ${record.vaccineOrDewormer}.`)} />
      </GlassCard>

      <AddVaccinationModal open={vaccineOpen} onClose={() => setVaccineOpen(false)} onSubmit={addVaccine} />
      <AddDewormingModal open={dewormingOpen} onClose={() => setDewormingOpen(false)} onSubmit={addDeworming} />
    </PageContainer>
  );
}
