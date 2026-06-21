import { useEffect, useMemo, useState } from "react";
import { CalendarClock, ClipboardPenLine, Clock3, Download, FileText, Filter, HeartPulse, Plus, TriangleAlert } from "lucide-react";
import { MedicalAlertCard } from "@/components/clinical/MedicalAlertCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { MedicalRecordCard } from "@/components/cards/MedicalRecordCard";
import { StatCard } from "@/components/cards/StatCard";
import { SearchInput } from "@/components/forms/SearchInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { FormModal } from "@/components/modals/FormModal";
import { ScheduleFollowUpModal } from "@/components/modals/ScheduleFollowUpModal";
import { MedicalRecordsTable } from "@/components/tables/MedicalRecordsTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { medicalRecordKpis } from "@/data/mockMedicalRecords";
import { followUpService } from "@/services/followUpService";
import { medicalRecordService } from "@/services/medicalRecordService";

const iconMap = { CalendarClock, ClipboardPenLine, Clock3, FileText, HeartPulse, TriangleAlert };
const option = (value) => ({ label: value, value });

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [followUpSource, setFollowUpSource] = useState(null);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("All species");
  const [branch, setBranch] = useState("All branches");
  const [doctor, setDoctor] = useState("All doctors");
  const [alertType, setAlertType] = useState("All alerts");
  const [status, setStatus] = useState("All statuses");

  useEffect(() => {
    medicalRecordService.getMedicalRecords().then((data) => {
      setRecords(data);
      setLoading(false);
    });
  }, []);

  const options = useMemo(() => ({
    species: ["All species", ...new Set(records.map((record) => record.species))],
    branches: ["All branches", ...new Set(records.map((record) => record.branch))],
    doctors: ["All doctors", ...new Set(records.map((record) => record.doctor))],
    statuses: ["All statuses", ...new Set(records.map((record) => record.status))],
  }), [records]);

  const filtered = useMemo(() => records.filter((record) => {
    const haystack = [record.petName, record.ownerName, record.microchip, record.lastDiagnosis].join(" ").toLowerCase();
    return haystack.includes(search.toLowerCase())
      && (species === "All species" || record.species === species)
      && (branch === "All branches" || record.branch === branch)
      && (doctor === "All doctors" || record.doctor === doctor)
      && (status === "All statuses" || record.status === status)
      && (alertType === "All alerts" || record.alerts.includes(alertType));
  }), [alertType, branch, doctor, records, search, species, status]);

  const createFollowUp = async (payload) => {
    await followUpService.createFollowUp(payload);
    setNotice(`Follow-up scheduled for ${payload.petName}.`);
    setFollowUpSource(null);
  };

  if (loading) return <PageContainer className="space-y-4"><LoadingSkeleton className="min-h-[116px]" /><LoadingSkeleton variant="table" /></PageContainer>;

  return (
    <PageContainer className="space-y-5">
      <PageHeader title="Medical Records" subtitle="Review complete pet clinical history, diagnoses, SOAP notes, and treatment plans." actions={<><ActionButton icon={Plus}>New Record</ActionButton><ActionButton icon={Download} variant="ghost">Export</ActionButton><ActionButton icon={Filter} variant="ghost">Filter</ActionButton></>} />
      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {medicalRecordKpis.map((item) => {
          const Icon = iconMap[item.icon] || FileText;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard>
        <div className="grid gap-3 md:grid-cols-2 min-[900px]:grid-cols-6">
          <SearchInput placeholder="Search pet, owner, microchip, diagnosis" value={search} onChange={(event) => setSearch(event.target.value)} className="min-[900px]:col-span-2" />
          <SelectInput label="Species" value={species} onChange={(event) => setSpecies(event.target.value)} options={options.species.map(option)} />
          <SelectInput label="Branch" value={branch} onChange={(event) => setBranch(event.target.value)} options={options.branches.map(option)} />
          <SelectInput label="Doctor" value={doctor} onChange={(event) => setDoctor(event.target.value)} options={options.doctors.map(option)} />
          <SelectInput label="Alert type" value={alertType} onChange={(event) => setAlertType(event.target.value)} options={["All alerts", "Allergy", "Senior pet", "Chronic disease", "Critical warning", "Overdue recalls"].map(option)} />
          <SelectInput label="Record status" value={status} onChange={(event) => setStatus(event.target.value)} options={options.statuses.map(option)} />
        </div>
      </GlassCard>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <GlassCard className="space-y-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-text-main">Medical Records Table</h2>
            <p className="mt-1 text-sm text-text-secondary">Searchable EMR index for clinical review.</p>
          </div>
          <MedicalRecordsTable records={filtered} onView={setSelected} onAddNote={(record) => setNotice(`Note action opened for ${record.petName}.`)} onPrescription={(record) => setNotice(`Prescription action selected for ${record.petName}.`)} onFollowUp={setFollowUpSource} />
        </GlassCard>
        <div className="space-y-4">
          {filtered.slice(0, 4).map((record) => <MedicalRecordCard key={record.id} record={record} onView={setSelected} />)}
        </div>
      </div>

      <FormModal open={Boolean(selected)} title="Medical Record Detail" subtitle={selected ? `${selected.petName} - ${selected.ownerName}` : ""} onClose={() => setSelected(null)}>
        {selected ? (
          <div className="space-y-4">
            <MedicalAlertCard alerts={selected.clinicalAlerts} compact />
            {["diagnosisHistory", "soapNotes", "prescriptions", "vaccinations", "labSummaries"].map((key) => (
              <section key={key} className="rounded-[20px] bg-white/45 p-4">
                <h3 className="font-heading text-sm font-bold capitalize text-text-main">{key.replace(/([A-Z])/g, " $1")}</h3>
                <ul className="mt-3 space-y-2 text-sm text-text-secondary">{selected[key].map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
            <section className="rounded-[20px] bg-white/45 p-4"><h3 className="font-heading text-sm font-bold text-text-main">Follow-up Plan</h3><p className="mt-3 text-sm leading-6 text-text-secondary">{selected.followUpPlan}</p></section>
          </div>
        ) : null}
      </FormModal>
      <ScheduleFollowUpModal open={Boolean(followUpSource)} source={followUpSource} onClose={() => setFollowUpSource(null)} onSubmit={createFollowUp} />
    </PageContainer>
  );
}
