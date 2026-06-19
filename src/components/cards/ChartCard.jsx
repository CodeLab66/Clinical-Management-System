import { MoreHorizontal } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";

export function ChartCard({ title, subtitle, actions, children, className }) {
  return (
    <GlassCard className={cn("min-h-[280px]", className)}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-text-main">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-text-secondary">{subtitle}</p> : null}
        </div>
        {actions || <IconButton icon={MoreHorizontal} label="Chart actions" />}
      </div>
      {children}
    </GlassCard>
  );
}
