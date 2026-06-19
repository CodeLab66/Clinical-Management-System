import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";
import { cn } from "@/lib/utils";

export function QuickActionCard({ icon: Icon = ArrowUpRight, title, description, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "glass-card flex min-h-[120px] w-full items-start gap-4 p-5 text-left transition hover:-translate-y-0.5 hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block break-words font-heading text-base font-bold leading-5 text-text-main">{title}</span>
        {description ? <span className="mt-1 block break-words text-sm leading-6 text-text-secondary">{description}</span> : null}
      </span>
    </button>
  );
}
