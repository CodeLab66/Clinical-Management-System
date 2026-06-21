import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleX, Clock3, Download, FilePlus2, Filter, Printer, RefreshCcw, Send } from "lucide-react";
import { PrescriptionPreview } from "@/components/clinical/PrescriptionPreview";
import { GlassCard } from "@/components/cards/GlassCard";
import { PrescriptionCard } from "@/components/cards/PrescriptionCard";
import { StatCard } from "@/components/cards/StatCard";
import { SearchInput } from "@/components/forms/SearchInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { AddPrescriptionModal } from "@/components/modals/AddPrescriptionModal";
import { FormModal } from "@/components/modals/FormModal";
import { PrescriptionTable } from "@/components/tables/PrescriptionTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { prescriptionKpis } from "@/data/mockPrescriptions";
import { prescriptionService } from "@/services/prescriptionService";

const iconMap = { CheckCircle2, CircleX, Clock3, FilePlus2, RefreshCcw, Send };
const option = (value) => ({ label: value, value });

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [branch, setBranch] = useState("All branches");
  const [doctor, setDoctor] = useState("All doctors");
  const [pharmacyStatus, setPharmacyStatus] = useState("All pharmacy statuses");

  useEffect(() => {
    prescriptionService.getPrescriptions().then((data) => {
      setPrescriptions(data);
      setLoading(false);
    });
  }, []);

  const options = useMemo(() => ({
    statuses: ["All statuses", ...new Set(prescriptions.map((item) => item.status))],
    branches: ["All branches", ...new Set(prescriptions.map((item) => item.branch))],
    doctors: ["All doctors", ...new Set(prescriptions.map((item) => item.doctor))],
    pharmacyStatuses: ["All pharmacy statuses", ...new Set(prescriptions.map((item) => item.pharmacyStatus))],
  }), [prescriptions]);

  const filtered = useMemo(() => prescriptions.filter((item) => {
    const haystack = [item.petName, item.ownerName, item.doctor, item.medicines.map((medicine) => medicine.name).join(" ")].join(" ").toLowerCase();
    return haystack.includes(search.toLowerCase())
      && (status === "All statuses" || item.status === status)
      && (branch === "All branches" || item.branch === branch)
      && (doctor === "All doctors" || item.doctor === doctor)
      && (pharmacyStatus === "All pharmacy statuses" || item.pharmacyStatus === pharmacyStatus);
  }), [branch, doctor, pharmacyStatus, prescriptions, search, status]);

  const savePrescription = async (payload) => {
    if (editing?.id) {
      const updated = await prescriptionService.updatePrescription(editing.id, { ...editing, ...payload });
      setPrescriptions((current) => current.map((item) => item.id === editing.id ? updated : item));
      setNotice(`${updated.id} updated.`);
    } else {
      const created = await prescriptionService.createPrescription(payload);
      setPrescriptions((current) => [created, ...current]);
      setNotice(`${created.id} created.`);
    }
    setEditing(null);
    setModalOpen(false);
  };
  const sendToPharmacy = async (prescription) => {
    const updated = await prescriptionService.sendToPharmacy(prescription.id);
    setPrescriptions((current) => current.map((item) => item.id === prescription.id ? { ...item, ...updated } : item));
    setNotice(`${prescription.id} sent to pharmacy.`);
  };
  const cancel = async (prescription) => {
    const updated = await prescriptionService.cancelPrescription(prescription.id);
    setPrescriptions((current) => current.map((item) => item.id === prescription.id ? { ...item, ...updated } : item));
    setNotice(`${prescription.id} cancelled.`);
  };

  if (loading) return <PageContainer className="space-y-4"><LoadingSkeleton className="min-h-[116px]" /><LoadingSkeleton variant="table" /></PageContainer>;

  return (
    <PageContainer className="space-y-5">
      <PageHeader title="Prescriptions" subtitle="Create, review, and send medication prescriptions to pharmacy." actions={<><ActionButton icon={FilePlus2} onClick={() => { setEditing(null); setModalOpen(true); }}>New Prescription</ActionButton><ActionButton icon={Printer} variant="ghost">Print</ActionButton><ActionButton icon={Download} variant="ghost">Export</ActionButton><ActionButton icon={Filter} variant="ghost">Filter</ActionButton></>} />
      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {prescriptionKpis.map((item) => {
          const Icon = iconMap[item.icon] || FilePlus2;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard>
        <div className="grid gap-3 md:grid-cols-2 min-[900px]:grid-cols-5">
          <SearchInput placeholder="Search pet, owner, doctor, medicine" value={search} onChange={(event) => setSearch(event.target.value)} className="min-[900px]:col-span-2" />
          <SelectInput label="Status" value={status} onChange={(event) => setStatus(event.target.value)} options={options.statuses.map(option)} />
          <SelectInput label="Branch" value={branch} onChange={(event) => setBranch(event.target.value)} options={options.branches.map(option)} />
          <SelectInput label="Doctor" value={doctor} onChange={(event) => setDoctor(event.target.value)} options={options.doctors.map(option)} />
          <SelectInput label="Pharmacy status" value={pharmacyStatus} onChange={(event) => setPharmacyStatus(event.target.value)} options={options.pharmacyStatuses.map(option)} />
        </div>
      </GlassCard>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <GlassCard className="space-y-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-text-main">Prescription Table</h2>
            <p className="mt-1 text-sm text-text-secondary">Doctor-generated prescriptions and pharmacy handoff state.</p>
          </div>
          <PrescriptionTable prescriptions={filtered} onView={setPreview} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onSend={sendToPharmacy} onPrint={setPreview} onCancel={cancel} />
        </GlassCard>
        <div className="space-y-4">{filtered.slice(0, 4).map((prescription) => <PrescriptionCard key={prescription.id} prescription={prescription} onView={setPreview} />)}</div>
      </div>

      <AddPrescriptionModal open={modalOpen} prescription={editing} onClose={() => setModalOpen(false)} onSubmit={savePrescription} />
      <FormModal open={Boolean(preview)} title="Prescription Preview" subtitle={preview?.id} onClose={() => setPreview(null)}>
        <PrescriptionPreview prescription={preview} />
      </FormModal>
    </PageContainer>
  );
}
