import { useEffect, useMemo, useState } from "react";
import { BellRing, CheckCircle2, CopyCheck, Download, Filter, Plus, UserPlus, Users, WalletCards } from "lucide-react";
import { ClientProfileCard } from "@/components/cards/ClientProfileCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { SearchInput } from "@/components/forms/SearchInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { AddClientModal } from "@/components/modals/AddClientModal";
import { FormModal } from "@/components/modals/FormModal";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClientTable } from "@/components/tables/ClientTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { clientKpis } from "@/data/mockClients";
import { clientService } from "@/services/clientService";

const iconMap = { BellRing, CheckCircle2, CopyCheck, UserPlus, Users, WalletCards };

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("All branches");
  const [status, setStatus] = useState("All statuses");
  const [payment, setPayment] = useState("All payments");
  const [followUp, setFollowUp] = useState("All follow-ups");
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    clientService.getClients().then((data) => {
      setClients(data);
      setLoading(false);
    });
  }, []);

  const branches = useMemo(() => ["All branches", ...new Set(clients.map((client) => client.preferredBranch))], [clients]);
  const filteredClients = useMemo(() => clients.filter((client) => {
    const haystack = [client.name, client.phone, client.email].join(" ").toLowerCase();
    return haystack.includes(search.toLowerCase())
      && (branch === "All branches" || client.preferredBranch === branch)
      && (status === "All statuses" || client.status === status)
      && (payment === "All payments" || (payment === "Pending payment" ? client.pendingBalance > 0 : client.pendingBalance === 0))
      && (followUp === "All follow-ups" || (followUp === "Due" ? client.followUpDue : !client.followUpDue));
  }), [branch, clients, followUp, payment, search, status]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (client) => {
    setEditing(client);
    setModalOpen(true);
  };

  const submitClient = async (payload) => {
    if (editing) {
      const updated = await clientService.updateClient(editing.id, { ...editing, ...payload });
      setClients((current) => current.map((client) => client.id === editing.id ? updated : client));
      setNotice(`${updated.name} updated.`);
    } else {
      const created = await clientService.createClient(payload);
      setClients((current) => [created, ...current]);
      setNotice(`${created.name} added.`);
    }
    setModalOpen(false);
  };

  if (loading) {
    return <PageContainer className="space-y-4"><LoadingSkeleton className="min-h-[116px]" /><LoadingSkeleton variant="table" /></PageContainer>;
  }

  return (
    <PageContainer className="space-y-5">
      <PageHeader
        title="Clients"
        subtitle="Manage pet owners, contact details, visit history, and communication records."
        actions={<><ActionButton icon={Plus} onClick={openCreate}>Add Client</ActionButton><ActionButton icon={Download} variant="ghost">Export</ActionButton><ActionButton icon={Filter} variant="ghost">Filter</ActionButton></>}
      />
      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {clientKpis.map((item) => {
          const Icon = iconMap[item.icon] || Users;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard>
        <div className="grid gap-3 md:grid-cols-2 min-[900px]:grid-cols-5">
          <SearchInput placeholder="Search name, phone, email" value={search} onChange={(event) => setSearch(event.target.value)} className="min-[900px]:col-span-2" />
          <SelectInput label="Branch" value={branch} onChange={(event) => setBranch(event.target.value)} options={branches.map((item) => ({ label: item, value: item }))} />
          <SelectInput label="Client Status" value={status} onChange={(event) => setStatus(event.target.value)} options={[{ label: "All statuses", value: "All statuses" }, { label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }, { label: "Follow-up due", value: "follow_up_due" }, { label: "Pending payment", value: "pending_payment" }]} />
          <SelectInput label="Pending Payment" value={payment} onChange={(event) => setPayment(event.target.value)} options={["All payments", "Pending payment", "No balance"].map((item) => ({ label: item, value: item }))} />
          <SelectInput label="Follow-up Due" value={followUp} onChange={(event) => setFollowUp(event.target.value)} options={["All follow-ups", "Due", "Not due"].map((item) => ({ label: item, value: item }))} />
        </div>
      </GlassCard>

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Client Directory</h2>
          <p className="mt-1 text-sm text-text-secondary">Owner identity, contact details, pet count, balance, branch, and account status.</p>
        </div>
        {filteredClients.length ? <ClientTable clients={filteredClients} onView={setProfile} onEdit={openEdit} /> : <EmptyState title="No clients found" description="Try adjusting search or filters." />}
      </GlassCard>

      <FormModal open={Boolean(profile)} title="Client Profile" subtitle={profile?.clientId} onClose={() => setProfile(null)}>
        <ClientProfileCard client={profile} />
      </FormModal>
      <AddClientModal open={modalOpen} client={editing} onClose={() => setModalOpen(false)} onSubmit={submitClient} />
    </PageContainer>
  );
}
