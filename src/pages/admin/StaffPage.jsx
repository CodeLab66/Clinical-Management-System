import { useEffect, useMemo, useState } from "react";
import {
  CalendarX2,
  CheckCircle2,
  Download,
  Edit,
  Eye,
  Filter,
  Headphones,
  MailWarning,
  Plus,
  ShieldCheck,
  Stethoscope,
  UserCog,
  UsersRound,
} from "lucide-react";
import { BranchBadge } from "@/components/badges/BranchBadge";
import { RoleBadge } from "@/components/badges/RoleBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { StaffProfileCard } from "@/components/cards/StaffProfileCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { CheckboxInput } from "@/components/forms/CheckboxInput";
import { SearchInput } from "@/components/forms/SearchInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { FormModal } from "@/components/modals/FormModal";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { availabilityOptions, staffKpis, staffRoleOptions, staffStatusOptions } from "@/data/mockStaff";
import { staffService } from "@/services/staffService";

const iconMap = { CalendarX2, CheckCircle2, Headphones, MailWarning, Stethoscope, UsersRound };

const initialForm = {
  name: "",
  staffId: "",
  role: "Veterinarian",
  branch: "DHA Branch",
  phone: "",
  email: "",
  shift: "Morning",
  specialization: "",
  licenseNumber: "",
  canLogin: true,
  accountStatus: "Active",
  assignedServices: "",
  notes: "",
};

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All roles");
  const [branch, setBranch] = useState("All branches");
  const [status, setStatus] = useState("All statuses");
  const [availability, setAvailability] = useState("All availability");
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    staffService.getStaff().then((data) => {
      setStaff(data);
      setLoading(false);
    });
  }, []);

  const branchOptions = useMemo(() => [
    { label: "All branches", value: "All branches" },
    ...Array.from(new Set(staff.map((member) => member.branch))).map((item) => ({ label: item, value: item })),
  ], [staff]);

  const filteredStaff = useMemo(() => staff.filter((member) => {
    const matchesSearch = [member.name, member.staffId, member.email].join(" ").toLowerCase().includes(search.toLowerCase());
    const matchesRole = role === "All roles" || member.role === role;
    const matchesBranch = branch === "All branches" || member.branch === branch;
    const matchesStatus = status === "All statuses" || member.accountStatus === status;
    const matchesAvailability = availability === "All availability" || member.availability === availability;
    return matchesSearch && matchesRole && matchesBranch && matchesStatus && matchesAvailability;
  }), [availability, branch, role, search, staff, status]);

  const columns = useMemo(() => [
    {
      key: "name",
      header: "Staff Member",
      render: (row) => (
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-xs font-black text-white">
            {row.avatar}
          </span>
          <div>
            <p className="font-bold text-text-main">{row.name}</p>
            <p className="mt-1 text-xs font-semibold text-text-muted">{row.staffId}</p>
          </div>
        </div>
      ),
    },
    { key: "role", header: "Role", render: (row) => <RoleBadge role={row.role} /> },
    { key: "branch", header: "Branch", render: (row) => <BranchBadge branch={row.branch} /> },
    { key: "phone", header: "Phone" },
    { key: "email", header: "Email" },
    { key: "shift", header: "Shift" },
    { key: "todayStatus", header: "Today Status", render: (row) => <StatusBadge status={row.todayStatus} /> },
    { key: "accountStatus", header: "Account Status", render: (row) => <StatusBadge status={row.accountStatus} /> },
  ], []);

  const openCreate = () => {
    setEditingStaff(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEdit = (member) => {
    setEditingStaff(member);
    setForm({
      name: member.name,
      staffId: member.staffId,
      role: member.role,
      branch: member.branch,
      phone: member.phone,
      email: member.email,
      shift: member.shift,
      specialization: member.specialization,
      licenseNumber: member.licenseNumber,
      canLogin: member.canLogin,
      accountStatus: member.accountStatus,
      assignedServices: member.assignedServices.join(", "),
      notes: member.notes,
    });
    setModalOpen(true);
  };

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submitForm = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      avatar: form.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
      todayStatus: form.accountStatus === "Active" ? "On Duty" : "Off Duty",
      availability: form.accountStatus === "Active" ? "On Duty" : "Off Duty",
      assignedServices: form.assignedServices.split(",").map((item) => item.trim()).filter(Boolean),
      upcomingShifts: ["Next roster pending"],
      recentActivity: ["Profile updated locally"],
      performance: "Performance metrics will populate from live activity.",
    };

    if (editingStaff) {
      const updated = await staffService.updateStaff(editingStaff.id, { ...editingStaff, ...payload });
      setStaff((current) => current.map((member) => (member.id === editingStaff.id ? updated : member)));
      setNotice(`${form.name} updated successfully.`);
    } else {
      const created = await staffService.createStaff(payload);
      setStaff((current) => [created, ...current]);
      setNotice(`${form.name} added successfully.`);
    }
    setModalOpen(false);
  };

  if (loading) {
    return (
      <PageContainer className="space-y-4">
        <LoadingSkeleton className="min-h-[116px]" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {staffKpis.map((item) => <LoadingSkeleton key={item.label} />)}
        </div>
        <LoadingSkeleton variant="table" />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-5">
      <PageHeader
        title="Staff Management"
        subtitle="Manage clinic team members, roles, branches, and availability."
        actions={(
          <>
            <ActionButton icon={Plus} onClick={openCreate}>Add Staff</ActionButton>
            <ActionButton icon={Download} variant="ghost">Export</ActionButton>
            <ActionButton icon={Filter} variant="ghost">Filter</ActionButton>
          </>
        )}
      />

      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {staffKpis.map((item) => {
          const Icon = iconMap[item.icon] || UsersRound;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 min-[900px]:grid-cols-5">
          <SearchInput placeholder="Search by name" value={search} onChange={(event) => setSearch(event.target.value)} className="min-[900px]:col-span-2" />
          <SelectInput label="Role" value={role} onChange={(event) => setRole(event.target.value)} options={[{ label: "All roles", value: "All roles" }, ...staffRoleOptions]} />
          <SelectInput label="Branch" value={branch} onChange={(event) => setBranch(event.target.value)} options={branchOptions} />
          <SelectInput label="Status" value={status} onChange={(event) => setStatus(event.target.value)} options={staffStatusOptions} />
          <SelectInput label="Availability" value={availability} onChange={(event) => setAvailability(event.target.value)} options={availabilityOptions} className="md:col-span-2 min-[900px]:col-span-1" />
        </div>
      </GlassCard>

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Team Directory</h2>
          <p className="mt-1 text-sm text-text-secondary">Role, access, shift, and branch assignment details.</p>
        </div>
        {filteredStaff.length ? (
          <DataTable
            columns={columns}
            rows={filteredStaff}
            actions={(row) => [
              { label: "View Profile", icon: Eye, onClick: () => setProfile(row) },
              { label: "Edit", icon: Edit, onClick: () => openEdit(row) },
              { label: "Change Role", icon: UserCog, onClick: () => openEdit(row) },
              { label: "Disable", icon: ShieldCheck },
            ]}
          />
        ) : (
          <EmptyState title="No staff found" description="Try adjusting filters or add a new team member." />
        )}
      </GlassCard>

      <FormModal
        open={Boolean(profile)}
        title="Staff Profile"
        subtitle="Team member access, services, shifts, and activity."
        onClose={() => setProfile(null)}
      >
        <StaffProfileCard staff={profile} />
      </FormModal>

      <FormModal
        open={modalOpen}
        title={editingStaff ? "Edit Staff" : "Add Staff"}
        subtitle="UI-only staff setup. Backend persistence will be connected later."
        onClose={() => setModalOpen(false)}
        footer={(
          <div className="flex flex-wrap justify-end gap-2">
            <ActionButton variant="ghost" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
            <ActionButton type="submit" form="staff-form">{editingStaff ? "Save Changes" : "Create Staff"}</ActionButton>
          </div>
        )}
      >
        <form id="staff-form" className="grid gap-4 md:grid-cols-2" onSubmit={submitForm}>
          <TextInput label="Full Name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
          <TextInput label="Staff ID" value={form.staffId} onChange={(event) => updateField("staffId", event.target.value)} required />
          <SelectInput label="Role" value={form.role} onChange={(event) => updateField("role", event.target.value)} options={staffRoleOptions} />
          <SelectInput label="Branch" value={form.branch} onChange={(event) => updateField("branch", event.target.value)} options={branchOptions.filter((item) => item.value !== "All branches")} />
          <TextInput label="Phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
          <TextInput label="Email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
          <SelectInput
            label="Shift Type"
            value={form.shift}
            onChange={(event) => updateField("shift", event.target.value)}
            options={["Morning", "Midday", "Evening", "Full Day", "Rotational"].map((item) => ({ label: item, value: item }))}
          />
          <TextInput label="Specialization" value={form.specialization} onChange={(event) => updateField("specialization", event.target.value)} />
          <TextInput label="License Number" value={form.licenseNumber} onChange={(event) => updateField("licenseNumber", event.target.value)} />
          <SelectInput
            label="Account Status"
            value={form.accountStatus}
            onChange={(event) => updateField("accountStatus", event.target.value)}
            options={staffStatusOptions.filter((item) => item.value !== "All statuses")}
          />
          <TextInput label="Assigned Services" value={form.assignedServices} onChange={(event) => updateField("assignedServices", event.target.value)} helper="Separate services with commas." className="md:col-span-2" />
          <CheckboxInput label="Can Login" checked={form.canLogin} onChange={(event) => updateField("canLogin", event.target.checked)} />
          <TextAreaInput label="Notes" value={form.notes} onChange={(event) => updateField("notes", event.target.value)} />
        </form>
      </FormModal>
    </PageContainer>
  );
}
