import { GlassCard } from "@/components/cards/GlassCard";
import { cn } from "@/lib/utils";

export function FormCard({ title, description, actions, children, className }) {
  return (
    <GlassCard className={cn("space-y-6", className)}>
      {(title || description || actions) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? <h3 className="font-heading text-lg font-bold text-text-main">{title}</h3> : null}
            {description ? <p className="mt-1 text-sm text-text-secondary">{description}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </div>
      )}
      {children}
    </GlassCard>
  );
}
