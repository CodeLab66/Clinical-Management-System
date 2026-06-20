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
  compact = false,
  size = "compact",
  className,
}) {
  const TrendIcon = trendType === "down" ? ArrowDownRight : ArrowUpRight;
  const tone = trendType === "up" ? "success" : trendType === "down" ? "danger" : "neutral";
  const isCompact = compact || size === "compact";

  return (
    <GlassCard
      padding={isCompact ? "compact" : "default"}
      className={cn(
        isCompact ? "min-h-0" : "min-h-[140px]",
        className,
      )}
    >
      <div className={cn("flex min-w-0 items-start justify-between", isCompact ? "gap-3" : "gap-4")}>
        <div className="min-w-0">
          <p className={cn("break-words font-semibold text-text-secondary", isCompact ? "text-[11px] leading-4 xl:text-[13px]" : "text-xs xl:text-sm")}>{label}</p>
          <p className={cn("break-words font-heading font-bold text-text-main", isCompact ? "mt-1 text-[20px] leading-6 xl:text-[27px] xl:leading-8" : "mt-3 text-2xl xl:text-3xl")}>{value}</p>
          {subtitle ? <p className={cn("break-words text-text-muted", isCompact ? "mt-0.5 text-[10px] leading-4 xl:text-[11px]" : "mt-2 text-xs xl:text-sm")}>{subtitle}</p> : null}
        </div>
        <span className={cn("inline-flex shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark", isCompact ? "h-8 w-8 xl:h-9 xl:w-9" : "h-10 w-10 xl:h-11 xl:w-11")}>
          <Icon className={cn(isCompact ? "h-4 w-4" : "h-5 w-5")} aria-hidden="true" />
        </span>
      </div>
      {trend ? (
        <div className={cn("inline-flex max-w-full items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold leading-none xl:px-2.5 xl:text-[11px]", isCompact ? "mt-1.5" : "mt-5 xl:text-xs", toneClasses[tone])}>
          <TrendIcon className="h-3 w-3 shrink-0" aria-hidden="true" />
          {trend}
        </div>
      ) : null}
    </GlassCard>
  );
}
