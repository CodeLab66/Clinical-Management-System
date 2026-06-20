import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { GlassCard } from "@/components/cards/GlassCard";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";

const metricStyles = {
  success: {
    tile: "bg-success/10",
    icon: "bg-success/12 text-success",
    text: "text-success",
  },
  warning: {
    tile: "bg-warning/10",
    icon: "bg-warning/15 text-[#8a5a17]",
    text: "text-[#8a5a17]",
  },
  danger: {
    tile: "bg-danger/10",
    icon: "bg-danger/10 text-danger",
    text: "text-danger",
  },
  neutral: {
    tile: "bg-white/45",
    icon: "bg-black/5 text-text-secondary",
    text: "text-text-secondary",
  },
};

const breakdownStyles = {
  revenue: "bg-primary",
  expense: "bg-warning",
};

function trendIcon(status) {
  return status === "danger" || status === "warning" ? ArrowDownRight : ArrowUpRight;
}

export function FinancialMetricTile({ metric }) {
  const style = metricStyles[metric.status] || metricStyles.neutral;
  const TrendIcon = trendIcon(metric.status);

  return (
    <div className={cn("min-w-0 rounded-[20px] border border-white/55 p-4", style.tile)}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
            {metric.label}
          </p>
          <p className="mt-2 break-words font-heading text-2xl font-bold leading-none text-text-main">
            {metric.value}
          </p>
        </div>
        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl", style.icon)}>
          <TrendIcon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 break-words text-xs leading-5 text-text-secondary">
        {metric.subtitle}
      </p>
      <p className={cn("mt-2 text-xs font-bold", style.text)}>{metric.trend}</p>
    </div>
  );
}

export function BreakdownRow({ item, tone = "revenue" }) {
  const barClass = breakdownStyles[tone] || breakdownStyles.revenue;

  return (
    <div className="min-w-0">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <p className="min-w-0 break-words text-sm font-bold text-text-main">
          {item.category}
        </p>
        <p className="shrink-0 text-sm font-bold text-text-secondary">{item.label}</p>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/65">
        <div
          className={cn("h-full rounded-full", barClass)}
          style={{ width: `${item.percentage}%` }}
        />
      </div>
    </div>
  );
}

function FinancialRecords({ records = [] }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[22px] border border-white/60 bg-white/45">
      <div className="overflow-x-auto">
        <table className="min-w-[860px] text-left text-sm">
          <thead className="bg-white/55 text-[11px] uppercase tracking-[0.12em] text-text-muted">
            <tr>
              {["Time", "Type", "Category", "Description", "Branch", "Amount", "Status"].map((header) => (
                <th key={header} className="whitespace-nowrap px-4 py-3 font-bold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/60">
            {records.map((record) => (
              <tr key={record.id} className="transition hover:bg-white/45">
                <td className="whitespace-nowrap px-4 py-4 font-semibold text-text-secondary">
                  {record.time}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold capitalize leading-none",
                      record.type === "expense"
                        ? "bg-warning/15 text-[#8a5a17]"
                        : "bg-success/12 text-success",
                    )}
                  >
                    {record.type}
                  </span>
                </td>
                <td className="px-4 py-4 font-semibold text-text-main">{record.category}</td>
                <td className="px-4 py-4 text-text-secondary">{record.description}</td>
                <td className="px-4 py-4 text-text-secondary">{record.branch}</td>
                <td className="whitespace-nowrap px-4 py-4 font-bold text-text-main">{record.amount}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={record.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function FinancialOverviewCard({
  metrics = [],
  revenueBreakdown = [],
  expenseBreakdown = [],
  records = [],
  className,
}) {
  return (
    <GlassCard className={cn("space-y-5", className)}>
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold text-text-main">
            Financial Overview
          </h3>
          <p className="mt-1 text-sm leading-5 text-text-secondary">
            Revenue, expenses, and net performance across today's clinic operations.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="whitespace-nowrap rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-text-muted">
            Today
          </span>
          <IconButton icon={MoreHorizontal} label="Financial overview actions" className="h-9 w-9" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <FinancialMetricTile key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-[22px] bg-white/40 p-4">
          <h4 className="font-heading text-base font-bold text-text-main">
            Revenue Breakdown
          </h4>
          <div className="mt-4 space-y-4">
            {revenueBreakdown.map((item) => (
              <BreakdownRow key={item.id} item={item} tone="revenue" />
            ))}
          </div>
        </div>

        <div className="rounded-[22px] bg-white/40 p-4">
          <h4 className="font-heading text-base font-bold text-text-main">
            Expense Breakdown
          </h4>
          <div className="mt-4 space-y-4">
            {expenseBreakdown.map((item) => (
              <BreakdownRow key={item.id} item={item} tone="expense" />
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-heading text-base font-bold text-text-main">
          Recent Financial Records
        </h4>
        <FinancialRecords records={records} />
      </div>
    </GlassCard>
  );
}
