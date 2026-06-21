import { Phone, MessageCircle } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";

export function FollowUpCard({ followUp, onComplete, onReschedule }) {
  return (
    <article className="rounded-[22px] border border-white/65 bg-white/60 p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-heading text-base font-bold text-text-main">{followUp.petName}</p>
          <p className="mt-1 truncate text-sm font-semibold text-text-secondary">{followUp.reason}</p>
        </div>
        <PriorityBadge priority={followUp.priority} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2"><StatusBadge status={followUp.status} /><span className="rounded-full bg-white/70 px-2 py-1 text-[11px] font-bold text-text-muted">{followUp.dueDate}</span></div>
      <p className="mt-3 text-sm leading-6 text-text-secondary">{followUp.notes}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="rounded-full bg-primary px-3 py-2 text-xs font-bold text-white" onClick={() => onComplete?.(followUp)}>Complete</button>
        <button type="button" className="rounded-full bg-white/70 px-3 py-2 text-xs font-bold text-text-secondary" onClick={() => onReschedule?.(followUp)}>Reschedule</button>
        <button type="button" className="inline-flex items-center justify-center gap-1 rounded-full bg-white/70 px-3 py-2 text-xs font-bold text-text-secondary"><Phone className="h-3.5 w-3.5" aria-hidden="true" />Call</button>
        <button type="button" className="inline-flex items-center justify-center gap-1 rounded-full bg-white/70 px-3 py-2 text-xs font-bold text-text-secondary"><MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />WhatsApp</button>
      </div>
    </article>
  );
}
