import {
  Activity,
  CalendarPlus,
  Clock3,
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
import { FinancialOverviewCard } from "@/components/cards/FinancialOverviewCard";
import { FollowUpRecallCard } from "@/components/cards/FollowUpRecallCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { MetricCard } from "@/components/cards/MetricCard";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { ProgressRingCard } from "@/components/cards/ProgressRingCard";
import { QuickActionCard } from "@/components/cards/QuickActionCard";
import { ReminderCard } from "@/components/cards/ReminderCard";
import { StatCard } from "@/components/cards/StatCard";
import { TopDoctorsFullWidthCard } from "@/components/cards/TopDoctorsFullWidthCard";
import { BranchBadge } from "@/components/badges/BranchBadge";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { RoleBadge } from "@/components/badges/RoleBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { ActivityFeed } from "@/components/common/ActivityFeed";
import { AvatarStatusList } from "@/components/common/AvatarStatusList";
import { ClientInfoCard } from "@/components/common/ClientInfoCard";
import { KanbanColumn } from "@/components/common/KanbanColumn";
import { MedicalWarningCard } from "@/components/common/MedicalWarningCard";
import { OwnerSummaryCard } from "@/components/common/OwnerSummaryCard";
import { PetSummaryCard } from "@/components/common/PetSummaryCard";
import { QuickActionsPanel } from "@/components/common/QuickActionsPanel";
import { Timeline } from "@/components/common/Timeline";
import { WorkflowStepper } from "@/components/common/WorkflowStepper";
import { DonutProgressChart } from "@/components/charts/DonutProgressChart";
import { MiniLegend } from "@/components/charts/MiniLegend";
import { RoundedBarChart } from "@/components/charts/RoundedBarChart";
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
import { chartPalette, themeColors } from "@/constants/theme";
import { financialOverview } from "@/data/mockDashboard";

const stats = [
  { label: "Appointments", value: "36", subtitle: "Today", trend: "+8%", trendType: "up", icon: CalendarPlus },
  { label: "Active queue", value: "14", subtitle: "Across branches", trend: "2 urgent", trendType: "neutral", icon: ClipboardList },
  { label: "Lab pending", value: "9", subtitle: "Doctor review included", trend: "-3", trendType: "down", icon: FlaskConical },
];

const workflowPreview = [
  { id: 1, short_title: "Requests", value: 18, status: "completed", step_state: "completed", icon_key: "requests" },
  { id: 2, short_title: "Confirmed", value: 36, status: "completed", step_state: "completed", icon_key: "confirmed" },
  { id: 3, short_title: "Checked In", value: 24, status: "completed", step_state: "completed", icon_key: "checked_in" },
  { id: 4, short_title: "Consultation", value: 3, status: "in_consultation", step_state: "active", icon_key: "consultation" },
  { id: 5, short_title: "Lab/Pharmacy", value: 6, status: "lab_pending", step_state: "pending", icon_key: "lab_pharmacy" },
  { id: 6, short_title: "Billing", value: 4, status: "billing_pending", step_state: "pending", icon_key: "billing" },
  { id: 7, short_title: "Completed", value: 22, status: "completed", step_state: "completed", icon_key: "completed" },
];

const pendingTaskPreview = [
  { id: 1, title: "Lab reports pending doctor review", subtitle: "4 reports need clinical sign-off", status: "doctor_review_pending", priority: "urgent" },
  { id: 2, title: "Emergency consent pending", subtitle: "Bella requires signed emergency consent", status: "pending", priority: "critical" },
];

const inventoryPreview = [
  { label: "Low stock", value: 12, status: "low_stock" },
  { label: "Near expiry", value: 7, status: "near_expiry" },
  { label: "Expired", value: 2, status: "expired" },
  { label: "Out of stock", value: 3, status: "out_of_stock" },
];

const followUpRecallPreview = [
  { id: 1, label: "Vaccine Due", count: "8 pets", status: "due_today", icon: "syringe" },
  { id: 2, label: "Deworming Due", count: "5 pets", status: "due_soon", icon: "pill" },
  { id: 3, label: "Post-Surgery Check", count: "3 pets", status: "important", icon: "stethoscope" },
  { id: 4, label: "Lab Recheck", count: "4 pets", status: "doctor_review", icon: "lab" },
  { id: 5, label: "Missed Follow-ups", count: "6 clients", status: "overdue", icon: "calendar_x" },
  { id: 6, label: "Dental Recheck", count: "2 pets", status: "due_soon", icon: "stethoscope" },
];

const topDoctorsPreview = [
  {
    id: 1,
    rank: 1,
    name: "Dr. Ahmed",
    branch: "DHA",
    role: "Senior Veterinarian",
    consultations: 14,
    revenue: "PKR 31,500",
    average_time: "18 min",
    emergency_cases: 2,
    lab_reviews: 4,
    status: "active",
  },
  {
    id: 2,
    rank: 2,
    name: "Dr. Sara",
    branch: "Lake City",
    role: "Veterinary Physician",
    consultations: 9,
    revenue: "PKR 22,000",
    average_time: "21 min",
    emergency_cases: 1,
    lab_reviews: 3,
    status: "active",
  },
  {
    id: 3,
    rank: 3,
    name: "Dr. Hamza",
    branch: "UVAS",
    role: "Surgery & Diagnostics",
    consultations: 6,
    revenue: "PKR 16,500",
    average_time: "24 min",
    emergency_cases: 0,
    lab_reviews: 5,
    status: "reviewing_labs",
  },
];

const rows = [
  { id: 1, request_id: "REQ-1042", pet_name: "Max", owner_name: "Ayesha Khan", status: "confirmed", priority: "normal" },
  { id: 2, request_id: "REQ-1043", pet_name: "Milo", owner_name: "Usman Ali", status: "lab_pending", priority: "urgent" },
  { id: 3, request_id: "REQ-1044", pet_name: "Luna", owner_name: "Sara Ahmed", status: "billing_pending", priority: "critical" },
];

const weeklyAppointments = [
  { id: 1, label: "S", value: 68, status: "pending", pattern: true },
  { id: 2, label: "M", value: 82, status: "active", color: chartPalette.primaryDark },
  { id: 3, label: "T", value: 74, status: "active", active: true, valueLabel: "74%" },
  { id: 4, label: "W", value: 96, status: "active", color: "#6E3215" },
  { id: 5, label: "T", value: 88, status: "pending", pattern: true },
  { id: 6, label: "F", value: 63, status: "pending", pattern: true },
  { id: 7, label: "S", value: 79, status: "pending", pattern: true },
];

const branchInventoryBars = [
  { id: 1, label: "DHA", value: 72, active: true, valueLabel: "72%" },
  { id: 2, label: "GUL", value: 61, color: chartPalette.primaryDark },
  { id: 3, label: "JT", value: 44, status: "pending", pattern: true },
  { id: 4, label: "EMR", value: 68, status: "inactive", pattern: true },
  { id: 5, label: "BHR", value: 84, color: chartPalette.success },
  { id: 6, label: "MDL", value: 36, status: "pending", pattern: true },
  { id: 7, label: "CNT", value: 55, color: chartPalette.primary },
  { id: 8, label: "NTH", value: 29, status: "inactive", pattern: true },
];

const monthlyActivityBars = [
  { id: 1, label: "1", value: 42, status: "pending", pattern: true },
  { id: 2, label: "2", value: 55, color: chartPalette.primary },
  { id: 3, label: "3", value: 69, color: chartPalette.primaryDark },
  { id: 4, label: "4", value: 48, status: "pending", pattern: true },
  { id: 5, label: "5", value: 77, active: true, valueLabel: "77%" },
  { id: 6, label: "6", value: 91, color: "#6E3215" },
  { id: 7, label: "7", value: 64, color: chartPalette.primary },
  { id: 8, label: "8", value: 38, status: "pending", pattern: true },
  { id: 9, label: "9", value: 58, color: chartPalette.primaryDark },
  { id: 10, label: "10", value: 46, status: "inactive", pattern: true },
];

const referenceLegend = [
  { label: "Completed", color: chartPalette.success, value: "51%" },
  { label: "In Progress", color: chartPalette.primary, value: "41%" },
  { label: "Pending", pattern: true, value: "8%" },
];

const collaborationItems = [
  { id: 1, name: "Dr. Ahmed Khan", subtitle: "Consultations", status: "completed" },
  { id: 2, name: "Dr. Sara Malik", subtitle: "Lab reviews", status: "in_progress" },
  { id: 3, name: "Nadia Iqbal", subtitle: "Pharmacy queue", status: "pending" },
  { id: 4, name: "Dr. Usman Ali", subtitle: "Emergency duty", status: "critical" },
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
        <SectionHeader title="Cards" subtitle="Compact dashboard cards, reminders, and standard glass surfaces." />
        <ContentGrid columns={4}>
          {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
          <StatCard size="default" label="Default stat" value="PKR 86k" subtitle="Roomier metric card" trend="+18%" trendType="up" icon={CalendarPlus} />
          <MetricCard label="Capacity" value="72%" helper="Doctor schedule utilization" progress={72} />
          <ProfileCard title="Dr. Ahmed Khan" subtitle="Small Animal Medicine" meta={<><RoleBadge role="veterinarian" /><BranchBadge branch="DHA Branch" /></>} />
          <AlertCard severity="warning" title="Near expiry stock" description="Three inventory batches need review this week." />
          <QuickActionCard icon={Send} title="Send WhatsApp" description="Reusable quick command card." />
          <ReminderCard
            title="Lab Review"
            heading="Review Milo's CBC report"
            time="Today, 02:00 PM"
            buttonLabel="Review"
            icon={Clock3}
            variant="primary"
            compact
          />
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
            <WorkflowStepper steps={workflowPreview} layout="vertical" compact />
          </GlassCard>
          <GlassCard className="md:col-span-2">
            <WorkflowStepper steps={workflowPreview} layout="horizontal" compact showBadges={false} />
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
        <SectionHeader
          title="Charts"
          subtitle="Reusable dashboard visuals inspired by the new chart/card reference, adapted to VetOS orange accents."
        />
        <ContentGrid columns={2}>
          <ChartCard title="Weekly Appointments" subtitle="Pill bars with pending texture" filterText="This week" large>
            <RoundedBarChart
              data={weeklyAppointments}
              activeIndex={2}
              valueKey="value"
              labelKey="label"
              variant="appointments"
              height={260}
              showValueBubble
            />
            <MiniLegend
              className="mt-5"
              items={[
                { label: "Booked", color: chartPalette.primary },
                { label: "Pending slots", pattern: true },
              ]}
            />
          </ChartCard>

          <ChartCard title="Compact Weekly Activity" subtitle="Dashboard-sized rounded bars" filterText="Compact" compact>
            <RoundedBarChart
              data={weeklyAppointments}
              activeIndex={2}
              valueKey="value"
              labelKey="label"
              variant="appointments"
              height={180}
              showValueBubble
              compact
            />
          </ChartCard>

          <ProgressRingCard
            title="Visit Progress"
            subtitle="Rounded donut progress"
            filterText="Today"
            value={41}
            label="In progress"
            progressColor={chartPalette.primary}
            pendingPattern
            legend={referenceLegend}
          />

          <ProgressRingCard
            title="Compact Progress"
            subtitle="Smaller donut card"
            filterText="Today"
            value={68}
            label="Completed"
            progressColor={chartPalette.primary}
            pendingPattern
            legend={referenceLegend}
            compact
          />

          <ChartCard title="Lab Completion" subtitle="Segmented ring with striped pending state" filterText="This week">
            <DonutProgressChart
              value={68}
              label="Completed"
              segments={[
                { key: "completed", value: 52, color: chartPalette.success },
                { key: "in_progress", value: 16, color: chartPalette.primary },
                { key: "pending", value: 32, pattern: true },
              ]}
              legend={[
                { label: "Completed", color: chartPalette.success },
                { label: "In Progress", color: chartPalette.primary },
                { label: "Pending", pattern: true },
              ]}
            />
          </ChartCard>

          <AvatarStatusList
            title="Doctor Collaboration"
            actionLabel="View all"
            items={collaborationItems}
          />

          <ReminderCard
            title="Emergency Reminder"
            heading="Recheck Max in 20 minutes"
            time="Critical triage follow-up - 05:40 PM"
            buttonLabel="Open Case"
            icon={Clock3}
            variant="emergency"
          />

          <ChartCard title="Inventory Health" subtitle="Soft rounded bars for stock signals" filterText="Branches">
            <RoundedBarChart
              data={branchInventoryBars}
              activeIndex={0}
              valueKey="value"
              labelKey="label"
              variant="inventory"
              height={220}
            />
          </ChartCard>
        </ContentGrid>
      </section>

      <section>
        <SectionHeader
          title="Dashboard Patterns"
          subtitle="Operational row and metric tile patterns used by the Admin Overview."
        />
        <ContentGrid columns={3}>
          <GlassCard className="space-y-3 md:col-span-2">
            <h3 className="font-heading text-lg font-bold text-text-main">Pending Task Rows</h3>
            {pendingTaskPreview.map((task) => (
              <div key={task.id} className="rounded-[20px] border border-white/60 bg-white/45 p-4">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <p className="min-w-0 break-words text-sm font-bold leading-5 text-text-main">{task.title}</p>
                  <GhostButton className="min-h-9 shrink-0 px-4 text-xs">Review</GhostButton>
                </div>
                <p className="mt-2 break-words text-sm leading-5 text-text-secondary">{task.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <PriorityBadge priority={task.priority} />
                  <StatusBadge status={task.status} />
                </div>
              </div>
            ))}
          </GlassCard>

          <GlassCard>
            <h3 className="font-heading text-lg font-bold text-text-main">Inventory Tiles</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {inventoryPreview.map((item) => (
                <div key={item.label} className="rounded-[20px] bg-white/45 p-4">
                  <p className="break-words text-xs font-bold uppercase tracking-[0.12em] text-text-muted">{item.label}</p>
                  <p className="mt-3 font-heading text-3xl font-bold leading-none text-text-main">{item.value}</p>
                  <div className="mt-3"><StatusBadge status={item.status} /></div>
                </div>
              ))}
            </div>
          </GlassCard>

          <FollowUpRecallCard items={followUpRecallPreview} />

          <TopDoctorsFullWidthCard doctors={topDoctorsPreview} className="md:col-span-3" />

          <FinancialOverviewCard
            className="md:col-span-3"
            metrics={financialOverview.metrics}
            revenueBreakdown={financialOverview.revenueBreakdown}
            expenseBreakdown={financialOverview.expenseBreakdown}
            records={financialOverview.records}
          />

          <GlassCard>
            <h3 className="font-heading text-lg font-bold text-text-main">Separate Card</h3>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Right-side dashboard sections use independent glass cards instead of one long shared container.
            </p>
          </GlassCard>

          <GlassCard className="md:col-span-3">
            <h3 className="font-heading text-lg font-bold text-text-main">Flexible Masonry Columns</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Dashboard analytics stack as independent columns so shorter cards do not inherit row height from taller cards.
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {[
                ["Weekly activity", "Branch performance", "Inventory snapshot"],
                ["Service breakdown", "Workflow summary"],
                ["Critical cases", "Workflow summary"],
              ].map((column) => (
                <div key={column.join("-")} className="flex flex-col gap-4">
                  {column.map((label) => (
                    <div key={label} className="rounded-[20px] bg-white/45 p-4">
                      <p className="text-sm font-bold text-text-main">{label}</p>
                      <p className="mt-1 text-xs text-text-muted">Natural-height card slot</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </GlassCard>
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
