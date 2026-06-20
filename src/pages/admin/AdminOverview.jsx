import { useCallback, useEffect, useState } from "react";
import {
  CalendarDays,
  Download,
  FlaskConical,
  ListChecks,
  PackageSearch,
  Plus,
  Siren,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { ActivityFeed } from "@/components/common/ActivityFeed";
import { WorkflowStepper } from "@/components/common/WorkflowStepper";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { ChartCard } from "@/components/cards/ChartCard";
import { FinancialOverviewCard } from "@/components/cards/FinancialOverviewCard";
import { FollowUpRecallCard } from "@/components/cards/FollowUpRecallCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { TopDoctorsFullWidthCard } from "@/components/cards/TopDoctorsFullWidthCard";
import { DonutProgressChart } from "@/components/charts/DonutProgressChart";
import { MiniLegend } from "@/components/charts/MiniLegend";
import { RoundedBarChart } from "@/components/charts/RoundedBarChart";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { ErrorState } from "@/components/empty-states/ErrorState";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { chartPalette } from "@/constants/theme";
import { dashboardService } from "@/services/dashboardService";
import { cn } from "@/lib/utils";

const kpiIcons = {
  wallet: Wallet,
  calendar: CalendarDays,
  queue: ListChecks,
  siren: Siren,
  lab: FlaskConical,
  inventory: PackageSearch,
};

const serviceColors = [
  chartPalette.primary,
  chartPalette.info,
  chartPalette.warning,
  chartPalette.success,
  chartPalette.muted,
];

const appointmentColumns = [
  { key: "time", header: "Time" },
  { key: "pet_name", header: "Pet" },
  { key: "owner_name", header: "Owner" },
  { key: "service_name", header: "Service" },
  { key: "doctor_name", header: "Doctor" },
  { key: "branch_name", header: "Branch" },
  { key: "status", header: "Status", type: "status" },
];

function SectionEmpty({ title = "No data available", description }) {
  return (
    <EmptyState
      title={title}
      description={description || "This section is ready for live API data."}
      className="bg-white/35"
    />
  );
}

function DashboardSkeleton() {
  return (
    <PageContainer className="overview-page">
      <LoadingSkeleton className="min-h-[116px]" />
      <div className="grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_190px] min-[1024px]:grid-cols-[minmax(0,1fr)_230px] xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-5">
        <div className="flex min-w-0 flex-col gap-3 min-[1024px]:gap-4 xl:gap-5">
          <div className="grid gap-3 md:grid-cols-3 xl:gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
          <div className="grid items-start gap-3 md:grid-cols-2 min-[1024px]:gap-4 xl:gap-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <LoadingSkeleton key={index} className="min-h-[190px]" />
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-3 min-[1024px]:gap-4 xl:gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingSkeleton key={index} className="min-h-[180px]" />
          ))}
        </div>
      </div>
      <LoadingSkeleton variant="table" />
    </PageContainer>
  );
}

function WeeklyClinicActivity({ data }) {
  if (!data.length) {
    return <SectionEmpty title="No weekly activity" />;
  }

  return (
    <RoundedBarChart
      data={data}
      activeIndex={4}
      height={270}
      showValueBubble
      variant="appointments"
      compact
    />
  );
}

function ServiceBreakdown({ data }) {
  if (!data.length) {
    return <SectionEmpty title="No service data" />;
  }

  const segments = data.map((item, index) => ({
    key: item.title,
    label: item.title,
    value: item.value,
    color: serviceColors[index % serviceColors.length],
  }));
  const legend = data.map((item, index) => ({
    label: item.title,
    value: `${item.value}%`,
    color: serviceColors[index % serviceColors.length],
  }));

  return (
    <div className="grid min-w-0 gap-3 min-[1024px]:grid-cols-[148px_minmax(0,1fr)] min-[1024px]:items-center xl:grid-cols-1 2xl:grid-cols-[148px_minmax(0,1fr)]">
      <DonutProgressChart
        value={data[0]?.value || 0}
        label={data[0]?.title}
        segments={segments}
        size={150}
        strokeWidth={17}
        compact
        className="justify-self-center"
      />
      <MiniLegend items={legend} compact className="justify-start" />
    </div>
  );
}

function BranchPerformance({ data }) {
  if (!data.length) {
    return <SectionEmpty title="No branch data" />;
  }

  return (
    <RoundedBarChart
      data={data}
      activeIndex={0}
      valueKey="chart_value"
      labelKey="short_title"
      height={170}
      showValueBubble
      variant="revenue"
      compact
    />
  );
}

function WorkflowSummary({ data }) {
  if (!data.length) {
    return <SectionEmpty title="No workflow data" />;
  }

  return <WorkflowStepper steps={data} layout="vertical" compact />;
}

function PendingTasks({ tasks }) {
  if (!tasks.length) {
    return <SectionEmpty title="No pending tasks" description="All operational queues are clear." />;
  }

  return (
    <GlassCard className="space-y-3">
      <div>
        <h3 className="font-heading text-lg font-bold text-text-main">Pending Tasks</h3>
        <p className="mt-1 text-sm text-text-secondary">
          Operational follow-ups that need staff action.
        </p>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-[20px] border border-white/60 bg-white/45 p-4"
          >
            <div className="flex min-w-0 items-start justify-between gap-3">
              <p className="min-w-0 break-words text-sm font-bold leading-5 text-text-main">
                {task.title}
              </p>
              <ActionButton variant="ghost" className="min-h-9 shrink-0 px-4 text-xs">
                Review
              </ActionButton>
            </div>
            <p className="mt-2 break-words text-sm leading-5 text-text-secondary">
              {task.subtitle}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function InventorySnapshot({ snapshot }) {
  if (!snapshot) {
    return <SectionEmpty title="No inventory snapshot" />;
  }

  const items = [
    { label: "Low stock", value: snapshot.low_stock, status: "low_stock" },
    { label: "Near expiry", value: snapshot.near_expiry, status: "near_expiry" },
    { label: "Expired", value: snapshot.expired, status: "expired" },
    { label: "Out of stock", value: snapshot.out_of_stock, status: "out_of_stock" },
  ];

  return (
    <GlassCard>
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold text-text-main">
          Inventory Snapshot
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          Stock health across active branches.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.label} className="min-w-0 rounded-[20px] bg-white/45 p-3.5">
            <p className="break-words text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
              {item.label}
            </p>
            <p className="mt-2 font-heading text-2xl font-bold leading-none text-text-main">
              {item.value}
            </p>
            <div className="mt-2.5">
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function RemindersCard({ reminders, className }) {
  return (
    <GlassCard padding="compact" className={cn("space-y-2 self-start", className)}>
      <div>
        <h3 className="font-heading text-lg font-bold text-text-main">Today's Reminders</h3>
        <p className="mt-1 text-xs font-semibold text-text-muted">
          Priority actions for the clinic team.
        </p>
      </div>
      {!reminders.length ? (
        <SectionEmpty title="No reminders" />
      ) : (
        <div className="flex flex-col gap-2">
          {reminders.slice(0, 3).map((reminder) => (
            <div key={reminder.id} className="flex min-w-0 items-center gap-3 rounded-[18px] bg-white/45 p-2.5">
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <p className="break-words text-[13px] font-bold leading-[18px] text-text-main">
                    {reminder.heading}
                  </p>
                  <StatusBadge status={reminder.status} />
                </div>
                <p className="mt-0.5 text-xs font-semibold text-text-muted">{reminder.time}</p>
              </div>
              <ActionButton
                variant={reminder.variant === "danger" ? "danger" : "ghost"}
                className="min-h-7 shrink-0 px-3 text-[11px]"
              >
                {reminder.button_label}
              </ActionButton>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

function CriticalCasesCard({ criticalCases, className }) {
  return (
    <GlassCard className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-heading text-lg font-bold text-text-main">
          Critical Cases
        </h3>
        <StatusBadge status="critical" />
      </div>
      {!criticalCases.length ? (
        <SectionEmpty title="No critical cases" />
      ) : (
        <div className="space-y-3">
          {criticalCases.map((caseItem) => (
            <div key={caseItem.id} className="rounded-[20px] bg-white/45 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-text-main">{caseItem.pet_name}</p>
                  <p className="mt-1 break-words text-sm text-text-secondary">
                    {caseItem.title}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-text-muted">
                    {caseItem.subtitle} - {caseItem.doctor_name}
                  </p>
                </div>
                <PriorityBadge priority={caseItem.priority} />
              </div>
              <div className="mt-3">
                <StatusBadge status={caseItem.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

function RecentActivitiesCard({ recentActivities, className }) {
  return (
    <GlassCard className={cn("space-y-3", className)}>
      <h3 className="font-heading text-lg font-bold text-text-main">
        Recent Activities
      </h3>
      {!recentActivities.length ? (
        <SectionEmpty title="No recent activity" />
      ) : (
        <div className="max-h-[300px] overflow-y-auto pr-1">
          <ActivityFeed items={recentActivities.slice(0, 4)} compact />
        </div>
      )}
    </GlassCard>
  );
}

function KpiGrid({ metrics, className = "grid gap-3 md:grid-cols-3 xl:gap-5" }) {
  return (
    <section className={className}>
      {metrics.length ? (
        metrics.map((metric) => {
          const Icon = kpiIcons[metric.icon] || TrendingUp;
          return (
            <StatCard
              key={metric.id}
              label={metric.title}
              value={metric.value}
              subtitle={metric.subtitle}
              trend={metric.trend}
              trendType={metric.trend_type}
              icon={Icon}
              className={cn(
                metric.status === "critical" && "border-danger/20 bg-danger/5",
                metric.status === "warning" && "border-warning/25 bg-white/70",
              )}
            />
          );
        })
      ) : (
        <div className="md:col-span-full">
          <SectionEmpty title="No KPI metrics" />
        </div>
      )}
    </section>
  );
}

function ServiceBreakdownCard({ data }) {
  return (
    <ChartCard
      title="Service Breakdown"
      subtitle="Share of today's completed and active services."
      filterText="Today"
      compact
    >
      <ServiceBreakdown data={data} />
    </ChartCard>
  );
}

function WeeklyClinicActivityCard({ data }) {
  return (
    <ChartCard
      title="Weekly Clinic Activity"
      subtitle="Appointments and visits across all branches."
      filterText="This week"
      compact
    >
      <WeeklyClinicActivity data={data} />
    </ChartCard>
  );
}

function BranchPerformanceCard({ data }) {
  return (
    <ChartCard
      title="Branch Performance"
      subtitle="Revenue contribution by clinic branch."
      filterText="All branches"
      compact
    >
      <BranchPerformance data={data} />
    </ChartCard>
  );
}

function WorkflowSummaryCard({ data }) {
  return (
    <ChartCard
      title="Today's Workflow Summary"
      subtitle="Appointment flow from request to completed visit."
      filterText="Live"
      compact
    >
      <WorkflowSummary data={data} />
    </ChartCard>
  );
}

function AppointmentSummaryCard({ appointments }) {
  return (
    <GlassCard>
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold text-text-main">
            Today's Appointment Summary
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            Scheduled, checked-in, and completed appointments.
          </p>
        </div>
        <StatusBadge status="confirmed" />
      </div>
      {appointments.length ? (
        <DataTable columns={appointmentColumns} rows={appointments} />
      ) : (
        <SectionEmpty title="No appointments today" />
      )}
    </GlassCard>
  );
}

function DetailStack({ dashboard, includeAppointments = false, className = "overview-detail-stack" }) {
  return (
    <section className={className}>
      {includeAppointments ? <AppointmentSummaryCard appointments={dashboard.todayAppointments} /> : null}

      <TopDoctorsFullWidthCard doctors={dashboard.topDoctors} className="w-full max-w-none" />

      <FinancialOverviewCard
        className="w-full max-w-none"
        metrics={dashboard.financialOverview?.metrics}
        revenueBreakdown={dashboard.financialOverview?.revenueBreakdown}
        expenseBreakdown={dashboard.financialOverview?.expenseBreakdown}
        records={dashboard.financialOverview?.records}
      />

      <PendingTasks tasks={dashboard.pendingTasks} />

      <RecentActivitiesCard
        recentActivities={dashboard.recentActivities}
        className="w-full max-w-none"
      />
    </section>
  );
}

function DesktopOverviewLayout({ dashboard }) {
  return (
    <>
      <div className="overview-upper-layout">
        <main className="overview-left-flow">
          <KpiGrid metrics={dashboard.kpiMetrics} />

          <section className="grid min-w-0 items-start gap-3 md:grid-cols-2 min-[1024px]:gap-4 xl:gap-5">
            <div className="flex min-w-0 flex-col gap-3 min-[1024px]:gap-4 xl:gap-5">
              <ServiceBreakdownCard data={dashboard.serviceBreakdown} />
              <BranchPerformanceCard data={dashboard.branchPerformance} />
              <InventorySnapshot snapshot={dashboard.inventorySnapshot} />
            </div>

            <div className="flex min-w-0 flex-col gap-3 min-[1024px]:gap-4 xl:gap-5">
              <WeeklyClinicActivityCard data={dashboard.weeklyClinicActivity} />
              <FollowUpRecallCard items={dashboard.followUpRecallQueue} />
            </div>
          </section>

          <AppointmentSummaryCard appointments={dashboard.todayAppointments} />
        </main>

        <aside className="overview-right-rail">
          <RemindersCard reminders={dashboard.reminders} />
          <CriticalCasesCard criticalCases={dashboard.criticalCases} />
          <WorkflowSummaryCard data={dashboard.workflowSummary} />
        </aside>
      </div>

      <DetailStack dashboard={dashboard} />
    </>
  );
}

function TabletOverviewLayout({ dashboard }) {
  return (
    <div className="overview-tablet-layout">
      <KpiGrid
        metrics={dashboard.kpiMetrics}
        className="grid gap-3 md:grid-cols-2 min-[900px]:grid-cols-3"
      />

      <section className="tablet-dashboard-grid">
        <ServiceBreakdownCard data={dashboard.serviceBreakdown} />
        <WeeklyClinicActivityCard data={dashboard.weeklyClinicActivity} />
        <RemindersCard reminders={dashboard.reminders} />
        <CriticalCasesCard criticalCases={dashboard.criticalCases} />
        <BranchPerformanceCard data={dashboard.branchPerformance} />
        <WorkflowSummaryCard data={dashboard.workflowSummary} />
        <FollowUpRecallCard items={dashboard.followUpRecallQueue} />
        <InventorySnapshot snapshot={dashboard.inventorySnapshot} />
      </section>

      <DetailStack dashboard={dashboard} includeAppointments />
    </div>
  );
}

function MobileOverviewLayout({ dashboard }) {
  return (
    <div className="overview-mobile-layout">
      <KpiGrid metrics={dashboard.kpiMetrics} className="grid gap-3" />

      <section className="flex min-w-0 flex-col gap-3">
        <ServiceBreakdownCard data={dashboard.serviceBreakdown} />
        <WeeklyClinicActivityCard data={dashboard.weeklyClinicActivity} />
        <RemindersCard reminders={dashboard.reminders} />
        <CriticalCasesCard criticalCases={dashboard.criticalCases} />
        <BranchPerformanceCard data={dashboard.branchPerformance} />
        <WorkflowSummaryCard data={dashboard.workflowSummary} />
        <FollowUpRecallCard items={dashboard.followUpRecallQueue} />
        <InventorySnapshot snapshot={dashboard.inventorySnapshot} />
      </section>

      <DetailStack dashboard={dashboard} includeAppointments />
    </div>
  );
}

export default function AdminOverview() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        kpiMetrics,
        weeklyClinicActivity,
        serviceBreakdown,
        branchPerformance,
        workflowSummary,
        reminders,
        todayAppointments,
        pendingTasks,
        inventorySnapshot,
        followUpRecallQueue,
        criticalCases,
        topDoctors,
        recentActivities,
        financialOverview,
      ] = await Promise.all([
        dashboardService.getDashboardMetrics(),
        dashboardService.getWeeklyClinicActivity(),
        dashboardService.getServiceBreakdown(),
        dashboardService.getBranchPerformance(),
        dashboardService.getWorkflowSummary(),
        dashboardService.getReminders(),
        dashboardService.getTodayAppointments(),
        dashboardService.getPendingTasks(),
        dashboardService.getInventorySnapshot(),
        dashboardService.getFollowUpRecallQueue(),
        dashboardService.getCriticalCases(),
        dashboardService.getTopDoctors(),
        dashboardService.getRecentActivities(),
        dashboardService.getFinancialOverview(),
      ]);

      setDashboard({
        kpiMetrics,
        weeklyClinicActivity,
        serviceBreakdown,
        branchPerformance,
        workflowSummary,
        reminders,
        todayAppointments,
        pendingTasks,
        inventorySnapshot,
        followUpRecallQueue,
        criticalCases,
        topDoctors,
        recentActivities,
        financialOverview,
      });
    } catch (caughtError) {
      setError(caughtError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          title="Dashboard could not load"
          description="The overview service did not return data. Please try again."
          onRetry={loadDashboard}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="overview-page space-y-5">
      <PageHeader
        title="Overview"
        subtitle="Complete clinic operations summary for today."
        actions={
          <>
            <ActionButton variant="ghost" icon={Download}>
              Export Report
            </ActionButton>
            <ActionButton icon={Plus}>Add Appointment</ActionButton>
            <ActionButton variant="danger" icon={Siren}>
              Emergency Check-in
            </ActionButton>
          </>
        }
      />

      <div className="hidden xl:block">
        <DesktopOverviewLayout dashboard={dashboard} />
      </div>

      <div className="hidden md:block xl:hidden">
        <TabletOverviewLayout dashboard={dashboard} />
      </div>

      <div className="md:hidden">
        <MobileOverviewLayout dashboard={dashboard} />
      </div>
    </PageContainer>
  );
}
