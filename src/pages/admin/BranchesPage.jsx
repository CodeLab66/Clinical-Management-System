import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  DoorOpen,
  Download,
  Edit,
  Eye,
  Filter,
  ListChecks,
  Plus,
  Settings2,
  Stethoscope,
  Trash2,
  Wallet,
} from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { BranchCard } from "@/components/cards/BranchCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { CheckboxInput } from "@/components/forms/CheckboxInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextInput } from "@/components/forms/TextInput";
import { TimeInput } from "@/components/forms/TimeInput";
import { FormModal } from "@/components/modals/FormModal";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { branchKpis } from "@/data/mockBranches";
import { branchService } from "@/services/branchService";

const iconMap = { Building2, CheckCircle2, DoorOpen, ListChecks, Stethoscope, Wallet };
const money = new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 });

const initialForm = {
  name: "",
  code: "",
  address: "",
  city: "Lahore",
  phone: "",
  email: "",
  manager: "",
  openingTime: "09:00",
  closingTime: "21:00",
  emergencyAvailable: true,
  labStatus: "available",
  pharmacyStatus: "available",
  groomingAvailable: true,
  boardingAvailable: false,
  operatingStatus: "active",
};

export default function BranchesPage() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    branchService.getBranches().then((data) => {
      setBranches(data);
      setLoading(false);
    });
  }, []);

  const columns = useMemo(() => [
    {
      key: "name",
      header: "Branch",
      render: (row) => (
        <div>
          <p className="font-bold text-text-main">{row.name}</p>
          <p className="mt-1 text-xs font-semibold text-text-muted">{row.code}</p>
        </div>
      ),
    },
    { key: "manager", header: "Manager" },
    { key: "phone", header: "Phone" },
    { key: "doctorsOnDuty", header: "Doctors" },
    {
      key: "rooms",
      header: "Rooms",
      render: (row) => `${row.availableRooms}/${row.totalRooms} available`,
    },
    { key: "todayAppointments", header: "Today Appointments" },
    { key: "todayRevenue", header: "Revenue", render: (row) => money.format(row.todayRevenue) },
    { key: "operatingStatus", header: "Status", type: "status" },
  ], []);

  const openCreate = () => {
    setEditingBranch(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEdit = (branch) => {
    setEditingBranch(branch);
    setForm({
      name: branch.name,
      code: branch.code,
      address: branch.address,
      city: branch.city,
      phone: branch.phone,
      email: branch.email,
      manager: branch.manager,
      openingTime: branch.openingTime,
      closingTime: branch.closingTime,
      emergencyAvailable: branch.emergencyAvailable,
      labStatus: branch.labStatus,
      pharmacyStatus: branch.pharmacyStatus,
      groomingAvailable: branch.groomingAvailable,
      boardingAvailable: branch.boardingAvailable,
      operatingStatus: branch.operatingStatus,
    });
    setModalOpen(true);
  };

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submitForm = async (event) => {
    event.preventDefault();
    if (editingBranch) {
      const updated = await branchService.updateBranch(editingBranch.id, { ...editingBranch, ...form });
      setBranches((current) => current.map((branch) => (branch.id === editingBranch.id ? updated : branch)));
      setNotice(`${form.name} updated successfully.`);
    } else {
      const created = await branchService.createBranch({
        ...form,
        todayAppointments: 0,
        doctorsOnDuty: 0,
        availableRooms: 0,
        totalRooms: 0,
        occupiedRooms: 0,
        todayRevenue: 0,
        healthScore: 100,
        rating: 5,
        pendingTasks: 0,
      });
      setBranches((current) => [created, ...current]);
      setNotice(`${form.name} added successfully.`);
    }
    setModalOpen(false);
  };

  if (loading) {
    return (
      <PageContainer className="space-y-4">
        <LoadingSkeleton className="min-h-[116px]" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {branchKpis.map((item) => <LoadingSkeleton key={item.label} />)}
        </div>
        <LoadingSkeleton variant="table" />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-5">
      <PageHeader
        title="Branch Management"
        subtitle="Manage clinic branches, operating hours, rooms, and service availability."
        actions={(
          <>
            <ActionButton icon={Plus} onClick={openCreate}>Add Branch</ActionButton>
            <ActionButton icon={Download} variant="ghost">Export</ActionButton>
            <ActionButton icon={Filter} variant="ghost">Filter</ActionButton>
          </>
        )}
      />

      {notice ? (
        <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">
          {notice}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {branchKpis.map((item) => {
          const Icon = iconMap[item.icon] || Building2;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      {branches.length ? (
        <div className="grid gap-4 md:grid-cols-1 min-[900px]:grid-cols-2 2xl:grid-cols-4">
          {branches.map((branch) => <BranchCard key={branch.id} branch={branch} />)}
        </div>
      ) : (
        <EmptyState title="No branches found" description="Add a clinic branch to start assigning doctors, rooms, and services." />
      )}

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Branch Directory</h2>
          <p className="mt-1 text-sm text-text-secondary">Operational and contact details for each clinic branch.</p>
        </div>
        {branches.length ? (
          <DataTable
            columns={columns}
            rows={branches}
            actions={(row) => [
              { label: "View", icon: Eye },
              { label: "Edit", icon: Edit, onClick: () => openEdit(row) },
              { label: "Disable", icon: Trash2 },
              { label: "Manage Schedule", icon: Settings2 },
            ]}
          />
        ) : (
          <EmptyState title="No branches found" />
        )}
      </GlassCard>

      <FormModal
        open={modalOpen}
        title={editingBranch ? "Edit Branch" : "Add Branch"}
        subtitle="UI-only branch setup. Backend persistence will be connected later."
        onClose={() => setModalOpen(false)}
        footer={(
          <div className="flex flex-wrap justify-end gap-2">
            <ActionButton variant="ghost" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
            <ActionButton type="submit" form="branch-form">{editingBranch ? "Save Changes" : "Create Branch"}</ActionButton>
          </div>
        )}
      >
        <form id="branch-form" className="grid gap-4 md:grid-cols-2" onSubmit={submitForm}>
          <TextInput label="Branch Name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
          <TextInput label="Branch Code" value={form.code} onChange={(event) => updateField("code", event.target.value)} required />
          <TextInput label="Address" value={form.address} onChange={(event) => updateField("address", event.target.value)} className="md:col-span-2" required />
          <TextInput label="City" value={form.city} onChange={(event) => updateField("city", event.target.value)} required />
          <TextInput label="Phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required />
          <TextInput label="Email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
          <TextInput label="Branch Manager" value={form.manager} onChange={(event) => updateField("manager", event.target.value)} />
          <TimeInput label="Opening Time" value={form.openingTime} onChange={(event) => updateField("openingTime", event.target.value)} />
          <TimeInput label="Closing Time" value={form.closingTime} onChange={(event) => updateField("closingTime", event.target.value)} />
          <SelectInput
            label="Status"
            value={form.operatingStatus}
            onChange={(event) => updateField("operatingStatus", event.target.value)}
            options={[
              { label: "Active", value: "active" },
              { label: "Maintenance", value: "maintenance" },
              { label: "Inactive", value: "inactive" },
            ]}
          />
          <SelectInput
            label="Lab Available"
            value={form.labStatus}
            onChange={(event) => updateField("labStatus", event.target.value)}
            options={[
              { label: "Available", value: "available" },
              { label: "Limited", value: "limited" },
              { label: "Offline", value: "offline" },
            ]}
          />
          <SelectInput
            label="Pharmacy Available"
            value={form.pharmacyStatus}
            onChange={(event) => updateField("pharmacyStatus", event.target.value)}
            options={[
              { label: "Available", value: "available" },
              { label: "Limited", value: "limited" },
              { label: "Offline", value: "offline" },
            ]}
          />
          <CheckboxInput label="Emergency Available" checked={form.emergencyAvailable} onChange={(event) => updateField("emergencyAvailable", event.target.checked)} />
          <CheckboxInput label="Grooming Available" checked={form.groomingAvailable} onChange={(event) => updateField("groomingAvailable", event.target.checked)} />
          <CheckboxInput label="Boarding Available" checked={form.boardingAvailable} onChange={(event) => updateField("boardingAvailable", event.target.checked)} />
        </form>
      </FormModal>
    </PageContainer>
  );
}
