import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";
import { toneClasses } from "@/constants/theme";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon = ArrowUpRight,
  label,
  value,
  trend,
  trendType = "neutral",
  subtitle,
  className,
}) {
  const TrendIcon = trendType === "down" ? ArrowDownRight : ArrowUpRight;
  const tone = trendType === "up" ? "success" : trendType === "down" ? "danger" : "neutral";

  return (
    <GlassCard className={cn("min-h-[150px]", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-secondary">{label}</p>
          <p className="mt-3 font-heading text-3xl font-bold text-text-main">{value}</p>
          {subtitle ? <p className="mt-2 text-sm text-text-muted">{subtitle}</p> : null}
        </div>
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      {trend ? (
        <div className={cn("mt-5 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold", toneClasses[tone])}>
          <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {trend}
        </div>
      ) : null}
    </GlassCard>
  );
}
