import { CalendarDays } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";

export function MedicalTimeline({ items = [] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <article key={`${item.date}-${item.title}-${index}`} className="rounded-[20px] border border-white/60 bg-white/45 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-heading text-sm font-bold text-text-main">{item.title}</p>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-text-muted"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{item.date}</p>
            </div>
            <StatusBadge status={item.type} />
          </div>
          <p className="mt-3 text-sm leading-6 text-text-secondary">{item.note}</p>
        </article>
      ))}
    </div>
  );
}
