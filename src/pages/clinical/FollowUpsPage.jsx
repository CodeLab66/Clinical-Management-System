import { useEffect, useMemo, useState } from "react";
import { CalendarClock, CalendarDays, CheckCircle2, Download, Filter, PhoneMissed, Plus, Siren, TriangleAlert } from "lucide-react";
import { FollowUpCard } from "@/components/clinical/FollowUpCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { SearchInput } from "@/components/forms/SearchInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScheduleFollowUpModal } from "@/components/modals/ScheduleFollowUpModal";
import { FollowUpsTable } from "@/components/tables/FollowUpsTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { followUpKpis } from "@/data/mockFollowUps";
import { followUpService } from "@/services/followUpService";

const iconMap = { CalendarClock, CalendarDays, CheckCircle2, PhoneMissed, Siren, TriangleAlert };
const option = (value) => ({ label: value, value });

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [priority, setPriority] = useState("All priorities");
  const [doctor, setDoctor] = useState("All doctors");
  const [reason, setReason] = useState("All reasons");

  useEffect(() => {
    followUpService.getFollowUps().then((data) => {
      setFollowUps(data);
      setLoading(false);
    });
  }, []);

  const options = useMemo(() => ({
    statuses: ["All statuses", ...new Set(followUps.map((item) => item.status))],
    doctors: ["All doctors", ...new Set(followUps.map((item) => item.doctor))],
    reasons: ["All reasons", ...new Set(followUps.map((item) => item.reason))],
  }), [followUps]);

  const filtered = useMemo(() => followUps.filter((item) => {
    const haystack = [item.petName, item.ownerName, item.reason, item.relatedVisit].join(" ").toLowerCase();
    return haystack.includes(search.toLowerCase())
      && (status === "All statuses" || item.status === status)
      && (priority === "All priorities" || item.priority === priority)
      && (doctor === "All doctors" || item.doctor === doctor)
      && (reason === "All reasons" || item.reason === reason);
  }), [doctor, followUps, priority, reason, search, status]);

  const saveFollowUp = async (payload) => {
    if (editing?.id) {
      const updated = await followUpService.rescheduleFollowUp(editing.id, payload);
      setFollowUps((current) => current.map((item) => item.id === editing.id ? { ...item, ...updated } : item));
      setNotice(`${editing.petName} follow-up rescheduled.`);
    } else {
      const created = await followUpService.createFollowUp(payload);
      setFollowUps((current) => [created, ...current]);
      setNotice(`${created.petName} follow-up added.`);
    }
    setEditing(null);
    setModalOpen(false);
  };
  const complete = async (followUp) => {
    const updated = await followUpService.markFollowUpCompleted(followUp.id);
    setFollowUps((current) => current.map((item) => item.id === followUp.id ? { ...item, ...updated } : item));
    setNotice(`${followUp.petName} follow-up completed.`);
  };
  const reschedule = (followUp) => {
    setEditing(followUp);
    setModalOpen(true);
  };

  if (loading) return <PageContainer className="space-y-4"><LoadingSkeleton className="min-h-[116px]" /><LoadingSkeleton variant="table" /></PageContainer>;

  return (
    <PageContainer className="space-y-5">
      <PageHeader title="Follow-ups" subtitle="Track clinical recalls, rechecks, post-treatment reviews, and missed follow-ups." actions={<><ActionButton icon={Plus} onClick={() => { setEditing(null); setModalOpen(true); }}>Add Follow-up</ActionButton><ActionButton icon={Download} variant="ghost">Export</ActionButton><ActionButton icon={Filter} variant="ghost">Filter</ActionButton></>} />
      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {followUpKpis.map((item) => {
          const Icon = iconMap[item.icon] || CalendarClock;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard>
        <div className="grid gap-3 md:grid-cols-2 min-[900px]:grid-cols-5">
          <SearchInput placeholder="Search pet, owner, reason, related visit" value={search} onChange={(event) => setSearch(event.target.value)} className="min-[900px]:col-span-2" />
          <SelectInput label="Status" value={status} onChange={(event) => setStatus(event.target.value)} options={options.statuses.map(option)} />
          <SelectInput label="Priority" value={priority} onChange={(event) => setPriority(event.target.value)} options={["All priorities", "normal", "urgent", "critical"].map(option)} />
          <SelectInput label="Doctor" value={doctor} onChange={(event) => setDoctor(event.target.value)} options={options.doctors.map(option)} />
          <SelectInput label="Reason" value={reason} onChange={(event) => setReason(event.target.value)} options={options.reasons.map(option)} />
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-1 min-[900px]:grid-cols-2 xl:grid-cols-4">
        {filtered.slice(0, 4).map((followUp) => <FollowUpCard key={followUp.id} followUp={followUp} onComplete={complete} onReschedule={reschedule} />)}
      </div>

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Follow-up List</h2>
          <p className="mt-1 text-sm text-text-secondary">Clinical recalls after consultations, surgery, lab tests, vaccination, and prescriptions.</p>
        </div>
        <FollowUpsTable followUps={filtered} onComplete={complete} onReschedule={reschedule} onView={(item) => setNotice(`Record opened for ${item.petName}.`)} />
      </GlassCard>

      <ScheduleFollowUpModal open={modalOpen} source={editing} onClose={() => setModalOpen(false)} onSubmit={saveFollowUp} />
    </PageContainer>
  );
}
