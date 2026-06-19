import { GlassCard } from "@/components/cards/GlassCard";
import { cn } from "@/lib/utils";

export function ProfileCard({ avatar, title, subtitle, meta, actions, className }) {
  return (
    <GlassCard className={cn("flex flex-col gap-5 sm:flex-row sm:items-center", className)}>
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-primary-soft text-lg font-bold text-primary-dark">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : title?.slice(0, 2)}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-lg font-bold text-text-main">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-text-secondary">{subtitle}</p> : null}
        {meta ? <div className="mt-3 flex flex-wrap gap-2">{meta}</div> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </GlassCard>
  );
}
