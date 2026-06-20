import { useEffect, useState } from "react";
import { Ambulance, CheckCircle2, Clock3, Download, FlaskConical, Pill, Plus, Stethoscope, WalletCards } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { EmergencyCheckInModal } from "@/components/modals/EmergencyCheckInModal";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { QueueBoard } from "@/components/queue/QueueBoard";
import { DataTable } from "@/components/tables/DataTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { queueKpis } from "@/data/mockQueue";
import { queueService } from "@/services/queueService";

const iconMap = { CheckCircle2, Clock3, FlaskConical, Pill, Stethoscope, WalletCards };

export default function QueuePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    queueService.getQueueItems().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const moveItem = async (item, stage) => {
    const updated = await queueService.updateQueueStage(item.id, stage);
    setItems((current) => current.map((record) => record.id === item.id ? { ...record, ...updated } : record));
    setNotice(`${item.petName} moved to ${stage.replace("_", " ")}.`);
  };

  const markEmergency = async (item) => {
    const updated = await queueService.markEmergency(item.id);
    setItems((current) => current.map((record) => record.id === item.id ? { ...record, ...updated, alerts: [...record.alerts, "Emergency"] } : record));
    setNotice(`${item.petName} marked emergency.`);
  };

  const removeItem = async (item) => {
    await queueService.removeFromQueue(item.id);
    setItems((current) => current.filter((record) => record.id !== item.id));
    setNotice(`${item.petName} removed from queue.`);
  };

  const addEmergency = async (payload) => {
    const created = await queueService.addToQueue({
      ...payload,
      ownerName: payload.ownerName,
      petName: payload.petName,
      service: "Emergency Triage",
      doctor: payload.doctor,
      branch: payload.branch,
    });
    setItems((current) => [created, ...current]);
    setModalOpen(false);
    setNotice(`${created.petName} added for emergency triage.`);
  };

  const columns = [
    { key: "queueNo", header: "Queue No" },
    { key: "petName", header: "Pet", render: (row) => <div><p className="font-bold text-text-main">{row.petName}</p><PriorityBadge priority={row.priority} /></div> },
    { key: "ownerName", header: "Owner" },
    { key: "service", header: "Service" },
    { key: "doctor", header: "Doctor" },
    { key: "stage", header: "Stage", render: (row) => <StatusBadge status={row.status} /> },
    { key: "waitTime", header: "Wait Time" },
    { key: "priority", header: "Priority", render: (row) => <PriorityBadge priority={row.priority} /> },
  ];

  if (loading) {
    return <PageContainer className="space-y-4"><LoadingSkeleton className="min-h-[116px]" /><LoadingSkeleton variant="table" /></PageContainer>;
  }

  return (
    <PageContainer className="space-y-5">
      <PageHeader
        title="Queue Management"
        subtitle="Track checked-in pets from reception to consultation, lab, pharmacy, billing, and completion."
        actions={<><ActionButton icon={Ambulance} variant="danger" onClick={() => setModalOpen(true)}>Emergency Check-in</ActionButton><ActionButton icon={Plus} onClick={() => setModalOpen(true)}>Add Walk-in</ActionButton><ActionButton icon={Download} variant="ghost">Export</ActionButton></>}
      />
      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {queueKpis.map((item) => {
          const Icon = iconMap[item.icon] || Clock3;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard className="space-y-4 !overflow-visible">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Live Patient Flow</h2>
          <p className="mt-1 text-sm text-text-secondary">Stage rows for reception, doctors, diagnostics, pharmacy, and billing.</p>
        </div>
        <QueueBoard items={items} onMove={moveItem} onEmergency={markEmergency} onRemove={removeItem} />
      </GlassCard>

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Compact Queue List</h2>
          <p className="mt-1 text-sm text-text-secondary">Table alternative for fast scanning and keyboard-friendly operations.</p>
        </div>
        <DataTable
          columns={columns}
          rows={items}
          actions={(row) => [
            { label: "Move to Consultation", icon: Stethoscope, onClick: () => moveItem(row, "consultation") },
            { label: "Send to Lab", icon: FlaskConical, onClick: () => moveItem(row, "lab") },
            { label: "Send to Pharmacy", icon: Pill, onClick: () => moveItem(row, "pharmacy") },
            { label: "Send to Billing", icon: WalletCards, onClick: () => moveItem(row, "billing") },
            { label: "Mark Completed", icon: CheckCircle2, onClick: () => moveItem(row, "completed") },
            { label: "Mark Emergency", icon: Ambulance, onClick: () => markEmergency(row) },
          ]}
        />
      </GlassCard>

      <EmergencyCheckInModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={addEmergency} />
    </PageContainer>
  );
}
