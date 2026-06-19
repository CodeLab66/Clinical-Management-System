import { GlassCard } from "@/components/cards/GlassCard";
import { cn } from "@/lib/utils";

export function RightPanel({ title, subtitle, children, className }) {
  return (
    <GlassCard className={cn("self-start", className)}>
      {(title || subtitle) && (
        <div className="mb-5">
          {title ? <h2 className="font-heading text-lg font-bold text-text-main">{title}</h2> : null}
          {subtitle ? <p className="mt-1 text-sm text-text-secondary">{subtitle}</p> : null}
        </div>
      )}
      {children}
    </GlassCard>
  );
}
