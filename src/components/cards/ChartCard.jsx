import { MoreHorizontal } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  subtitle,
  filterText,
  actions,
  children,
  compact = false,
  large = false,
  className,
}) {
  return (
    <GlassCard
      padding={compact ? "compact" : "default"}
      className={cn(
        "rounded-[20px] border-white/65 bg-white/70 md:rounded-[22px] xl:rounded-[24px]",
        className,
      )}
    >
      <div className={cn("flex min-w-0 items-start justify-between gap-3 xl:gap-4", compact ? "mb-2.5 xl:mb-3" : "mb-4 xl:mb-5")}>
        <div className="min-w-0">
          <h3 className={cn("font-heading font-bold text-text-main", compact ? "text-[15px] xl:text-base" : "text-base xl:text-lg")}>
            {title}
          </h3>
          {subtitle ? <p className={cn("mt-1 break-words text-text-secondary", compact ? "text-xs leading-5" : "text-sm")}>{subtitle}</p> : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {filterText ? (
            <span className="whitespace-nowrap rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-text-muted">
              {filterText}
            </span>
          ) : null}
          {actions || <IconButton icon={MoreHorizontal} label="Chart actions" className="h-9 w-9" />}
        </div>
      </div>
      <div className="min-w-0 overflow-hidden">{children}</div>
    </GlassCard>
  );
}
