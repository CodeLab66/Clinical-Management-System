import { GlassCard } from "@/components/cards/GlassCard";
import { cn } from "@/lib/utils";

export function MetricCard({ label, value, helper, progress, children, className }) {
  const safeProgress = Math.min(Math.max(Number(progress || 0), 0), 100);

  return (
    <GlassCard className={cn("space-y-4", className)}>
      <div>
        <p className="text-sm font-semibold text-text-secondary">{label}</p>
        <p className="mt-2 font-heading text-2xl font-bold text-text-main">{value}</p>
        {helper ? <p className="mt-1 text-sm text-text-muted">{helper}</p> : null}
      </div>
      {typeof progress !== "undefined" ? (
        <div className="h-2 rounded-full bg-black/5">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      ) : (
        children || <div className="h-14 rounded-[18px] bg-white/45" />
      )}
    </GlassCard>
  );
}
