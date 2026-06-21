import { useEffect, useMemo, useState } from "react";
import { CalendarClock, CheckCircle2, Clock3, Download, Filter, Pill, Plus, Stethoscope, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConsultationCard } from "@/components/cards/ConsultationCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { SearchInput } from "@/components/forms/SearchInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { AddPrescriptionModal } from "@/components/modals/AddPrescriptionModal";
import { CompleteConsultationModal } from "@/components/modals/CompleteConsultationModal";
import { ScheduleFollowUpModal } from "@/components/modals/ScheduleFollowUpModal";
import { ConsultationTable } from "@/components/tables/ConsultationTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { consultationKpis } from "@/data/mockConsultations";
import { consultationService } from "@/services/consultationService";
import { prescriptionService } from "@/services/prescriptionService";

const iconMap = { CalendarClock, CheckCircle2, Clock3, Pill, Stethoscope, TriangleAlert };
const all = (label) => ({ label, value: label });

export default function ConsultationsPage() {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("All branches");
  const [doctor, setDoctor] = useState("All doctors");
  const [status, setStatus] = useState("All statuses");
  const [service, setService] = useState("All services");
  const [priority, setPriority] = useState("All priorities");
  const [date, setDate] = useState("");
  const [prescribing, setPrescribing] = useState(null);
  const [followUpSource, setFollowUpSource] = useState(null);
  const [completing, setCompleting] = useState(null);

  useEffect(() => {
    consultationService.getConsultations().then((data) => {
      setConsultations(data);
      setLoading(false);
    });
  }, []);

  const options = useMemo(() => ({
    branches: ["All branches", ...new Set(consultations.map((item) => item.branch))],
    doctors: ["All doctors", ...new Set(consultations.map((item) => item.doctor))],
    statuses: ["All statuses", ...new Set(consultations.map((item) => item.status))],
    services: ["All services", ...new Set(consultations.map((item) => item.service))],
  }), [consultations]);

  const filtered = useMemo(() => consultations.filter((item) => {
    const haystack = [item.petName, item.ownerName, item.doctor, item.queueNo].join(" ").toLowerCase();
    return haystack.includes(search.toLowerCase())
      && (branch === "All branches" || item.branch === branch)
      && (doctor === "All doctors" || item.doctor === doctor)
      && (status === "All statuses" || item.status === status)
      && (service === "All services" || item.service === service)
      && (priority === "All priorities" || item.priority === priority)
      && (!date || item.startedAt.includes(date));
  }), [branch, consultations, date, doctor, priority, search, service, status]);

  const activeConsultations = filtered.filter((item) => !["completed", "cancelled"].includes(item.status));
  const openWorkspace = (consultation) => navigate(`/app/consultations/${consultation.id}`);
  const startConsultation = async (consultation) => {
    const updated = await consultationService.startConsultation(consultation.id);
    setConsultations((current) => current.map((item) => item.id === consultation.id ? { ...item, ...updated } : item));
    setNotice(`${consultation.petName} consultation started.`);
  };
  const completeConsultation = async (payload) => {
    const updated = await consultationService.completeConsultation(completing.id, payload);
    setConsultations((current) => current.map((item) => item.id === completing.id ? { ...item, ...updated } : item));
    setNotice(`${completing.petName} marked completed.`);
    setCompleting(null);
  };
  const createPrescription = async (payload) => {
    await prescriptionService.createPrescription(payload);
    setNotice(`Prescription draft created for ${payload.petName}.`);
    setPrescribing(null);
  };
  const createFollowUp = async (payload) => {
    await consultationService.createFollowUp(followUpSource.id, payload);
    setConsultations((current) => current.map((item) => item.id === followUpSource.id ? { ...item, status: "follow_up_needed" } : item));
    setNotice(`Follow-up scheduled for ${payload.petName}.`);
    setFollowUpSource(null);
  };

  if (loading) return <PageContainer className="space-y-4"><LoadingSkeleton className="min-h-[116px]" /><LoadingSkeleton variant="table" /></PageContainer>;

  return (
    <PageContainer className="space-y-5">
      <PageHeader
        title="Consultations"
        subtitle="Manage active consultations, clinical notes, diagnoses, prescriptions, and follow-ups."
        actions={<><ActionButton icon={Stethoscope} onClick={() => startConsultation(activeConsultations[0] || consultations[0])}>Start Consultation</ActionButton><ActionButton icon={Plus} variant="ghost">New Walk-in Consultation</ActionButton><ActionButton icon={Download} variant="ghost">Export</ActionButton><ActionButton icon={Filter} variant="ghost">Filter</ActionButton></>}
      />
      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {consultationKpis.map((item) => {
          const Icon = iconMap[item.icon] || Stethoscope;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard>
        <div className="grid gap-3 md:grid-cols-2 min-[900px]:grid-cols-6">
          <SearchInput placeholder="Search pet, owner, doctor, queue number" value={search} onChange={(event) => setSearch(event.target.value)} className="min-[900px]:col-span-2" />
          <SelectInput label="Branch" value={branch} onChange={(event) => setBranch(event.target.value)} options={options.branches.map(all)} />
          <SelectInput label="Doctor" value={doctor} onChange={(event) => setDoctor(event.target.value)} options={options.doctors.map(all)} />
          <SelectInput label="Status" value={status} onChange={(event) => setStatus(event.target.value)} options={options.statuses.map(all)} />
          <SelectInput label="Service" value={service} onChange={(event) => setService(event.target.value)} options={options.services.map(all)} />
          <SelectInput label="Priority" value={priority} onChange={(event) => setPriority(event.target.value)} options={["All priorities", "normal", "urgent", "critical"].map(all)} />
          <label className="block"><span className="mb-2 block text-sm font-bold text-text-main">Date</span><input className="orange-focus min-h-11 w-full rounded-full border border-white/60 bg-white/55 px-4 text-sm text-text-main outline-none" type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
        </div>
      </GlassCard>

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Active Consultation Cards</h2>
          <p className="mt-1 text-sm text-text-secondary">Doctor-facing active work queue with vitals and quick workspace access.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-1 min-[900px]:grid-cols-2 xl:grid-cols-3">
          {activeConsultations.map((consultation) => <ConsultationCard key={consultation.id} consultation={consultation} onOpen={openWorkspace} />)}
        </div>
      </GlassCard>

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Consultation List</h2>
          <p className="mt-1 text-sm text-text-secondary">Active, upcoming, and completed consultations across branches.</p>
        </div>
        <ConsultationTable consultations={filtered} onOpen={openWorkspace} onSoap={openWorkspace} onPrescription={setPrescribing} onFollowUp={setFollowUpSource} onComplete={setCompleting} />
      </GlassCard>

      <AddPrescriptionModal open={Boolean(prescribing)} prescription={prescribing ? { petName: prescribing.petName, ownerName: prescribing.ownerName, doctor: prescribing.doctor, diagnosis: prescribing.diagnosis.primary, medicines: [{}] } : null} onClose={() => setPrescribing(null)} onSubmit={createPrescription} />
      <ScheduleFollowUpModal open={Boolean(followUpSource)} source={followUpSource} onClose={() => setFollowUpSource(null)} onSubmit={createFollowUp} />
      <CompleteConsultationModal open={Boolean(completing)} consultation={completing} onClose={() => setCompleting(null)} onSubmit={completeConsultation} />
    </PageContainer>
  );
}
