import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleX, Download, Filter, Inbox, MessageCircleQuestion, Plus, Siren, Timer } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { AppointmentRequestCard } from "@/components/cards/AppointmentRequestCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { SearchInput } from "@/components/forms/SearchInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { FormModal } from "@/components/modals/FormModal";
import { ConfirmRequestModal } from "@/components/modals/ConfirmRequestModal";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ActionButton } from "@/components/ui/ActionButton";
import { appointmentRequestKpis, requestSources, requestStatuses } from "@/data/mockAppointmentRequests";
import { appointmentRequestService } from "@/services/appointmentRequestService";

const iconMap = { CheckCircle2, CircleX, Inbox, MessageCircleQuestion, Siren, Timer };
const statusLabels = {
  new: "New",
  under_review: "Under Review",
  waiting_client_reply: "Waiting Client Reply",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

const requestSections = [
  { key: "new", title: "New Requests", description: "Fresh appointment requests awaiting review." },
  { key: "under_review", title: "Under Review", description: "Requests being checked by reception or care teams." },
  { key: "waiting_client_reply", title: "Waiting Client Reply", description: "Slots or details shared with clients for confirmation." },
  { key: "confirmed", title: "Confirmed Requests", description: "Requests converted into scheduled appointments." },
  { key: "cancelled", title: "Cancelled Requests", description: "Closed requests that no longer need action." },
];

export default function AppointmentRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [priority, setPriority] = useState("All priorities");
  const [service, setService] = useState("All services");
  const [branch, setBranch] = useState("All branches");
  const [date, setDate] = useState("All dates");
  const [source, setSource] = useState("All sources");
  const [selected, setSelected] = useState(null);
  const [confirming, setConfirming] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    appointmentRequestService.getAppointmentRequests().then((data) => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  const services = useMemo(() => ["All services", ...new Set(requests.map((item) => item.serviceType))], [requests]);
  const branches = useMemo(() => ["All branches", ...new Set(requests.map((item) => item.preferredBranch))], [requests]);
  const dates = useMemo(() => ["All dates", ...new Set(requests.map((item) => item.preferredDate))], [requests]);

  const filteredRequests = useMemo(() => requests.filter((request) => {
    const haystack = [request.ownerName, request.petName, request.phone].join(" ").toLowerCase();
    return haystack.includes(search.toLowerCase())
      && (status === "All statuses" || request.status === status)
      && (priority === "All priorities" || request.priority === priority)
      && (service === "All services" || request.serviceType === service)
      && (branch === "All branches" || request.preferredBranch === branch)
      && (date === "All dates" || request.preferredDate === date)
      && (source === "All sources" || request.source === source);
  }), [branch, date, priority, requests, search, service, source, status]);

  const confirmRequest = async (payload) => {
    const updated = await appointmentRequestService.confirmAppointmentRequest(confirming.id, payload);
    setRequests((current) => current.map((request) => request.id === confirming.id ? { ...request, ...updated, timeline: [...request.timeline, "Appointment confirmed locally"] } : request));
    setNotice(`${confirming.petName} confirmed for ${payload.date} at ${payload.time}.`);
    setConfirming(null);
  };

  const cancelRequest = async (request) => {
    const updated = await appointmentRequestService.cancelAppointmentRequest(request.id);
    setRequests((current) => current.map((item) => item.id === request.id ? { ...item, ...updated, timeline: [...item.timeline, "Request cancelled locally"] } : item));
    setNotice(`${request.petName} request cancelled.`);
  };

  const createRequest = async () => {
    const created = await appointmentRequestService.createAppointmentRequest({
      petName: "New Pet",
      petSpecies: "Dog",
      petBreed: "Pending",
      ownerName: "Reception Draft",
      phone: "03xx xxxxxxx",
      email: "",
      serviceType: "Consultation",
      preferredBranch: "DHA Branch",
      preferredDate: "2026-06-20",
      preferredTime: "13:30",
      source: "Reception",
      priority: "normal",
      symptoms: "Draft request created from reception.",
      notes: "Open review panel to complete details.",
      suggestedDoctor: "Dr. Sara Malik",
      internalNotes: "Draft created locally.",
    });
    setRequests((current) => [created, ...current]);
    setSelected(created);
    setNotice("New reception request draft created.");
  };

  if (loading) {
    return <PageContainer className="space-y-4"><LoadingSkeleton className="min-h-[116px]" /><LoadingSkeleton variant="table" /></PageContainer>;
  }

  return (
    <PageContainer className="space-y-5">
      <PageHeader
        title="Appointment Requests"
        subtitle="Review, prioritize, and confirm incoming appointment requests."
        actions={<><ActionButton icon={Plus} onClick={createRequest}>New Request</ActionButton><ActionButton icon={Download} variant="ghost">Export</ActionButton><ActionButton icon={Filter} variant="ghost">Filter</ActionButton></>}
      />
      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {appointmentRequestKpis.map((item) => {
          const Icon = iconMap[item.icon] || Inbox;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard className="space-y-4 !overflow-visible">
        <div className="grid gap-3 md:grid-cols-2 min-[900px]:grid-cols-4 xl:grid-cols-8">
          <SearchInput placeholder="Search owner, pet, phone" value={search} onChange={(event) => setSearch(event.target.value)} className="min-[900px]:col-span-2" />
          <SelectInput label="Status" value={status} onChange={(event) => setStatus(event.target.value)} options={[{ label: "All statuses", value: "All statuses" }, ...requestStatuses.map((item) => ({ label: statusLabels[item], value: item }))]} />
          <SelectInput label="Priority" value={priority} onChange={(event) => setPriority(event.target.value)} options={["All priorities", "normal", "urgent", "critical"].map((item) => ({ label: item.replaceAll("_", " "), value: item }))} />
          <SelectInput label="Service Type" value={service} onChange={(event) => setService(event.target.value)} options={services.map((item) => ({ label: item, value: item }))} />
          <SelectInput label="Branch" value={branch} onChange={(event) => setBranch(event.target.value)} options={branches.map((item) => ({ label: item, value: item }))} />
          <SelectInput label="Date" value={date} onChange={(event) => setDate(event.target.value)} options={dates.map((item) => ({ label: item, value: item }))} />
          <SelectInput label="Source" value={source} onChange={(event) => setSource(event.target.value)} options={[{ label: "All sources", value: "All sources" }, ...requestSources.map((item) => ({ label: item, value: item }))]} />
        </div>
      </GlassCard>

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Request Board</h2>
          <p className="mt-1 text-sm text-text-secondary">Move from intake review to confirmation while keeping client contact visible.</p>
        </div>
        {filteredRequests.length ? (
          <div className="space-y-4">
            {requestSections.map((section) => {
              const records = filteredRequests.filter((request) => request.status === section.key);
              return (
                <section key={section.key} className="request-status-section rounded-[22px] border border-white/60 bg-white/35 p-4">
                  <div className="workflow-section-header">
                    <div className="min-w-0">
                      <h3 className="font-heading text-base font-bold text-text-main">{section.title}</h3>
                      <p className="mt-1 text-sm text-text-secondary">{section.description}</p>
                    </div>
                    <span className="section-count-badge">{records.length} {records.length === 1 ? "request" : "requests"}</span>
                  </div>
                  {records.length ? (
                    <div className="request-card-grid mt-4">
                      {records.map((request) => (
                        <AppointmentRequestCard
                          key={request.id}
                          request={request}
                          onReview={setSelected}
                          onConfirm={setConfirming}
                          onAssign={setSelected}
                          onCancel={cancelRequest}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-[18px] border border-dashed border-white/70 bg-white/35 p-4 text-sm font-semibold text-text-muted">
                      No requests in this status.
                    </div>
                  )}
                  </section>
              );
            })}
          </div>
        ) : <EmptyState title="No requests found" description="Try adjusting search or filters." />}
      </GlassCard>

      <FormModal open={Boolean(selected)} title="Request Detail" subtitle={selected ? `${selected.petName} - ${selected.ownerName}` : ""} onClose={() => setSelected(null)}>
        {selected ? (
          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-[20px] bg-white/45 p-4"><h3 className="font-heading text-sm font-bold text-text-main">Owner Details</h3><p className="mt-3 text-sm text-text-secondary">{selected.ownerName}</p><p className="text-sm text-text-secondary">{selected.phone}</p><p className="text-sm text-text-secondary">{selected.email}</p></section>
            <section className="rounded-[20px] bg-white/45 p-4"><h3 className="font-heading text-sm font-bold text-text-main">Pet Details</h3><p className="mt-3 text-sm text-text-secondary">{selected.petName}</p><p className="text-sm text-text-secondary">{selected.petSpecies} / {selected.petBreed}</p></section>
            <section className="rounded-[20px] bg-white/45 p-4"><h3 className="font-heading text-sm font-bold text-text-main">Requested Service</h3><p className="mt-3 text-sm text-text-secondary">{selected.serviceType}</p><p className="text-sm text-text-secondary">{selected.preferredBranch} - {selected.preferredDate} {selected.preferredTime}</p><p className="mt-2"><StatusBadge status={selected.status} /> <PriorityBadge priority={selected.priority} /></p></section>
            <section className="rounded-[20px] bg-white/45 p-4"><h3 className="font-heading text-sm font-bold text-text-main">Source & Doctor</h3><p className="mt-3 text-sm text-text-secondary">{selected.source}</p><p className="text-sm text-text-secondary">Suggested: {selected.suggestedDoctor}</p></section>
            <section className="rounded-[20px] bg-white/45 p-4 md:col-span-2"><h3 className="font-heading text-sm font-bold text-text-main">Symptoms / Reason</h3><p className="mt-3 text-sm leading-6 text-text-secondary">{selected.symptoms}</p></section>
            <section className="rounded-[20px] bg-white/45 p-4"><h3 className="font-heading text-sm font-bold text-text-main">Request Timeline</h3>{selected.timeline.map((item) => <p key={item} className="mt-2 text-sm text-text-secondary">{item}</p>)}</section>
            <section className="rounded-[20px] bg-white/45 p-4"><h3 className="font-heading text-sm font-bold text-text-main">Internal Notes</h3><p className="mt-3 text-sm leading-6 text-text-secondary">{selected.internalNotes}</p></section>
            <section className="rounded-[20px] bg-warning/10 p-4 md:col-span-2"><h3 className="font-heading text-sm font-bold text-text-main">Conflict Warnings</h3>{selected.conflictWarnings.length ? selected.conflictWarnings.map((item) => <p key={item} className="mt-2 text-sm font-semibold text-[#8a5a17]">{item}</p>) : <p className="mt-2 text-sm text-text-muted">No conflicts detected.</p>}</section>
          </div>
        ) : null}
      </FormModal>

      <ConfirmRequestModal open={Boolean(confirming)} request={confirming} onClose={() => setConfirming(null)} onSubmit={confirmRequest} />
    </PageContainer>
  );
}
