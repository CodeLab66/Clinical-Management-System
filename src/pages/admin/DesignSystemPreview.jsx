import {
  Activity,
  CalendarPlus,
  ClipboardList,
  FileText,
  FlaskConical,
  Plus,
  Send,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";
import { AlertCard } from "@/components/cards/AlertCard";
import { ChartCard } from "@/components/cards/ChartCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { MetricCard } from "@/components/cards/MetricCard";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { QuickActionCard } from "@/components/cards/QuickActionCard";
import { StatCard } from "@/components/cards/StatCard";
import { BranchBadge } from "@/components/badges/BranchBadge";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { RoleBadge } from "@/components/badges/RoleBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { ActivityFeed } from "@/components/common/ActivityFeed";
import { ClientInfoCard } from "@/components/common/ClientInfoCard";
import { KanbanColumn } from "@/components/common/KanbanColumn";
import { MedicalWarningCard } from "@/components/common/MedicalWarningCard";
import { OwnerSummaryCard } from "@/components/common/OwnerSummaryCard";
import { PetSummaryCard } from "@/components/common/PetSummaryCard";
import { QuickActionsPanel } from "@/components/common/QuickActionsPanel";
import { Timeline } from "@/components/common/Timeline";
import { WorkflowStepper } from "@/components/common/WorkflowStepper";
import { BranchBarChart } from "@/components/charts/BranchBarChart";
import { ActivityAreaChart } from "@/components/charts/ActivityAreaChart";
import { RevenueLineChart } from "@/components/charts/RevenueLineChart";
import { ServiceDonutChart } from "@/components/charts/ServiceDonutChart";
import { StockGauge } from "@/components/charts/StockGauge";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { ErrorState } from "@/components/empty-states/ErrorState";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { CheckboxInput } from "@/components/forms/CheckboxInput";
import { DateInput } from "@/components/forms/DateInput";
import { FileUploadCard } from "@/components/forms/FileUploadCard";
import { FormCard } from "@/components/forms/FormCard";
import { FormSection } from "@/components/forms/FormSection";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { TimeInput } from "@/components/forms/TimeInput";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { DataTable } from "@/components/tables/DataTable";
import { TableFilters } from "@/components/tables/TableFilters";
import { TablePagination } from "@/components/tables/TablePagination";
import { TableToolbar } from "@/components/tables/TableToolbar";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { DetailModal } from "@/components/modals/DetailModal";
import { FormModal } from "@/components/modals/FormModal";
import { PreviewModal } from "@/components/modals/PreviewModal";
import { DangerButton } from "@/components/ui/DangerButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { themeColors } from "@/constants/theme";

const stats = [
  { label: "Appointments", value: "36", subtitle: "Today", trend: "+8%", trendType: "up", icon: CalendarPlus },
  { label: "Active queue", value: "14", subtitle: "Across branches", trend: "2 urgent", trendType: "neutral", icon: ClipboardList },
  { label: "Lab pending", value: "9", subtitle: "Doctor review included", trend: "-3", trendType: "down", icon: FlaskConical },
];

const rows = [
  { id: 1, request_id: "REQ-1042", pet_name: "Max", owner_name: "Ayesha Khan", status: "confirmed", priority: "normal" },
  { id: 2, request_id: "REQ-1043", pet_name: "Milo", owner_name: "Usman Ali", status: "lab_pending", priority: "urgent" },
  { id: 3, request_id: "REQ-1044", pet_name: "Luna", owner_name: "Sara Ahmed", status: "billing_pending", priority: "critical" },
];

const chartData = [
  { name: "Mon", value: 22000 },
  { name: "Tue", value: 31500 },
  { name: "Wed", value: 28600 },
  { name: "Thu", value: 42000 },
  { name: "Fri", value: 38600 },
];

const timelineItems = [
  { id: 1, type: "appointment", title: "Appointment confirmed", description: "Reception confirmed visit slot.", date: "2026-06-19", time: "10:20" },
  { id: 2, type: "consultation", title: "SOAP draft created", description: "Doctor started clinical notes.", date: "2026-06-19", time: "11:05" },
  { id: 3, type: "lab_order", title: "CBC ordered", description: "Sample collection pending.", date: "2026-06-19", time: "11:20" },
];

const queueItems = rows.map((row, index) => ({
  id: row.id,
  token_number: `Q-0${index + 12}`,
  pet_name: row.pet_name,
  owner_name: row.owner_name,
  species: index === 1 ? "cat" : "dog",
  doctor_name: "Dr. Ahmed Khan",
  service: "Consultation",
  waiting_minutes: 12 + index * 8,
  priority: row.priority,
  status: row.status,
}));

export default function DesignSystemPreview() {
  const [modal, setModal] = useState(null);

  return (
    <PageContainer className="space-y-8">
      <PageHeader
        title="Design System"
        subtitle="Reusable VetOS Pro UI foundation for future internal clinic modules."
        breadcrumbs={<span>Phase 2</span>}
        actions={<PrimaryButton icon={Plus}>Preview CTA</PrimaryButton>}
      />

      <section>
        <SectionHeader title="Colors" subtitle="Grey/orange glassmorphism palette." />
        <ContentGrid className="gap-4" columns={4}>
          {Object.entries(themeColors).map(([name, value]) => (
            <GlassCard key={name} className="p-4">
              <div className="h-14 rounded-[18px] border border-white/60" style={{ background: value }} />
              <p className="mt-3 text-sm font-bold text-text-main">{name}</p>
              <p className="text-xs text-text-muted">{value}</p>
            </GlassCard>
          ))}
        </ContentGrid>
      </section>

      <section>
        <SectionHeader title="Cards" />
        <ContentGrid columns={4}>
          {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
          <MetricCard label="Capacity" value="72%" helper="Doctor schedule utilization" progress={72} />
          <ProfileCard title="Dr. Ahmed Khan" subtitle="Small Animal Medicine" meta={<><RoleBadge role="veterinarian" /><BranchBadge branch="DHA Branch" /></>} />
          <AlertCard severity="warning" title="Near expiry stock" description="Three inventory batches need review this week." />
          <QuickActionCard icon={Send} title="Send WhatsApp" description="Reusable quick command card." />
        </ContentGrid>
      </section>

      <section>
        <SectionHeader title="Buttons And Badges" />
        <GlassCard className="space-y-5">
          <div className="flex flex-wrap gap-3">
            <PrimaryButton icon={Plus}>Primary</PrimaryButton>
            <GhostButton>Ghost</GhostButton>
            <DangerButton>Emergency</DangerButton>
          </div>
          <div className="flex flex-wrap gap-2">
            {["new_request", "confirmed", "waiting_for_doctor", "lab_pending", "completed", "cancelled", "paid", "low_stock"].map((status) => <StatusBadge key={status} status={status} />)}
            {["normal", "urgent", "emergency", "critical"].map((priority) => <PriorityBadge key={priority} priority={priority} />)}
            <RoleBadge role="super_admin" />
            <BranchBadge branch="Gulberg Branch" />
          </div>
        </GlassCard>
      </section>

      <section>
        <SectionHeader title="Forms" />
        <FormCard title="Appointment Request Form" description="Inputs use normal props and glass styling.">
          <FormSection title="Client and pet details">
            <TextInput label="Owner name" placeholder="Ayesha Khan" />
            <TextInput label="Pet name" placeholder="Max" />
            <SelectInput label="Service" options={[{ label: "Consultation", value: "consultation" }, { label: "Vaccination", value: "vaccination" }]} />
            <DateInput label="Preferred date" />
            <TimeInput label="Preferred time" />
            <TextAreaInput label="Complaint" placeholder="Short clinical reason" />
            <CheckboxInput label="Emergency case" helper="Use only for urgent triage." />
          </FormSection>
          <FileUploadCard title="Upload supporting file" description="Later used for pet photos, lab reports, imaging, and consent forms." />
        </FormCard>
      </section>

      <section>
        <SectionHeader title="Modals" />
        <GlassCard className="flex flex-wrap gap-3">
          <PrimaryButton onClick={() => setModal("detail")}>Detail modal</PrimaryButton>
          <PrimaryButton onClick={() => setModal("form")}>Form modal</PrimaryButton>
          <GhostButton onClick={() => setModal("preview")}>Preview modal</GhostButton>
          <DangerButton onClick={() => setModal("confirm")}>Confirm modal</DangerButton>
        </GlassCard>
      </section>

      <section>
        <SectionHeader title="Tables" />
        <GlassCard>
          <TableToolbar title="Requests" searchPlaceholder="Search requests..." actions={<PrimaryButton icon={Plus}>Add</PrimaryButton>} />
          <TableFilters filters={[{ label: "All", value: "all" }, { label: "Pending", value: "pending" }, { label: "Completed", value: "completed" }]} active="all" />
          <div className="mt-4">
            <DataTable
              columns={[
                { key: "request_id", header: "ID" },
                { key: "pet_name", header: "Pet" },
                { key: "owner_name", header: "Owner" },
                { key: "status", header: "Status", type: "status" },
                { key: "priority", header: "Priority", render: (row) => <PriorityBadge priority={row.priority} /> },
              ]}
              rows={rows}
              actions={() => [{ label: "Open", icon: FileText }, { label: "Send", icon: Send }]}
            />
          </div>
          <TablePagination page={1} totalPages={4} />
        </GlassCard>
      </section>

      <section>
        <SectionHeader title="Timeline And Activity" />
        <ContentGrid columns={2}>
          <GlassCard><Timeline items={timelineItems} /></GlassCard>
          <GlassCard><ActivityFeed items={timelineItems.map((item) => ({ ...item, status: "confirmed", time: item.time }))} /></GlassCard>
        </ContentGrid>
      </section>

      <section>
        <SectionHeader title="Queue And Workflow" />
        <ContentGrid columns={2}>
          <KanbanColumn title="Waiting for doctor" subtitle="Reusable queue board column" items={queueItems} />
          <GlassCard>
            <WorkflowStepper current={2} steps={[
              { label: "Check-in", description: "Reception" },
              { label: "Doctor", description: "Consultation" },
              { label: "Lab", description: "Diagnostics" },
              { label: "Pharmacy", description: "Dispense" },
              { label: "Billing", description: "POS handoff" },
            ]} />
          </GlassCard>
        </ContentGrid>
      </section>

      <section>
        <SectionHeader title="Profiles And Medical Display" />
        <ContentGrid columns={3}>
          <PetSummaryCard pet={{ name: "Max", species: "dog", breed: "German Shepherd", vaccination_status: "pending", deworming_status: "completed" }} />
          <OwnerSummaryCard owner={{ name: "Ayesha Khan", phone: "03001234567" }} />
          <ClientInfoCard client={{ name: "Usman Ali", phone: "03215556677" }} />
          <MedicalWarningCard allergies={["Penicillin"]} warnings={["Anxious during injections"]} biteHistory={false} />
          <GlassCard>
            <QuickActionsPanel actions={[
              { icon: Stethoscope, title: "Start Consultation", description: "Begin SOAP workflow" },
              { icon: FlaskConical, title: "Order Lab", description: "Create diagnostic order" },
              { icon: Activity, title: "Schedule Follow-up", description: "Add reminder" },
            ]} />
          </GlassCard>
        </ContentGrid>
      </section>

      <section>
        <SectionHeader title="Charts" />
        <ContentGrid columns={2}>
          <ChartCard title="Revenue"><RevenueLineChart data={chartData} /></ChartCard>
          <ChartCard title="Activity"><ActivityAreaChart data={chartData} /></ChartCard>
          <ChartCard title="Services"><ServiceDonutChart data={[{ name: "Consultation", value: 45 }, { name: "Lab", value: 24 }, { name: "Pharmacy", value: 31 }]} /></ChartCard>
          <ChartCard title="Branches"><BranchBarChart data={chartData} /></ChartCard>
          <ChartCard title="Stock Gauge"><StockGauge value={42} /></ChartCard>
        </ContentGrid>
      </section>

      <section>
        <SectionHeader title="States" />
        <ContentGrid columns={3}>
          <EmptyState title="No appointments" description="Empty states stay calm and actionable." />
          <LoadingSkeleton />
          <ErrorState />
        </ContentGrid>
      </section>

      <DetailModal open={modal === "detail"} title="Appointment request" subtitle="Reusable detail shell" onClose={() => setModal(null)}>
        <p className="text-sm leading-6 text-text-secondary">DetailModal can show appointment requests, pet quick views, lab orders, or bill details.</p>
      </DetailModal>
      <FormModal open={modal === "form"} title="Quick add" subtitle="Reusable add/edit shell" onClose={() => setModal(null)}>
        <FormSection>
          <TextInput label="Name" placeholder="Record name" />
          <SelectInput label="Status" options={[{ label: "Pending", value: "pending" }, { label: "Completed", value: "completed" }]} />
        </FormSection>
      </FormModal>
      <PreviewModal open={modal === "preview"} title="PDF preview" onClose={() => setModal(null)} />
      <ConfirmModal open={modal === "confirm"} title="Cancel request?" description="This modal is used for destructive or irreversible actions." onClose={() => setModal(null)} onConfirm={() => setModal(null)} />
    </PageContainer>
  );
}
