import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export function TimelineItem({ icon: Icon = CalendarDays, title, description, date, time, type = "note", className }) {
  return (
    <li className={cn("relative flex gap-4 pb-6 last:pb-0", className)}>
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 rounded-[20px] bg-white/45 p-4">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">{type.replaceAll("_", " ")}</span>
        <span className="mt-1 block font-heading text-base font-bold text-text-main">{title}</span>
        {description ? <span className="mt-1 block text-sm leading-6 text-text-secondary">{description}</span> : null}
        {(date || time) ? <span className="mt-3 block text-xs font-semibold text-text-muted">{date} {time}</span> : null}
      </span>
    </li>
  );
}
