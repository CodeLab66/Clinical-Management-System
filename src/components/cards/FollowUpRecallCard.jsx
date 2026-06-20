import {
  CalendarX,
  ClockAlert,
  FlaskConical,
  Pill,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";
import { cn } from "@/lib/utils";

const iconMap = {
  syringe: Syringe,
  pill: Pill,
  stethoscope: Stethoscope,
  lab: FlaskConical,
  calendar_x: CalendarX,
  clock_alert: ClockAlert,
};

const statusStyles = {
  due_today: {
    label: "Due today",
    badge: "bg-primary-soft text-primary-dark",
    icon: "bg-primary-soft text-primary-dark",
  },
  due_soon: {
    label: "Due soon",
    badge: "bg-warning/15 text-[#8a5a17]",
    icon: "bg-warning/15 text-[#8a5a17]",
  },
  important: {
    label: "Important",
    badge: "bg-primary-soft text-primary-dark",
    icon: "bg-primary-soft text-primary-dark",
  },
  doctor_review: {
    label: "Doctor review",
    badge: "bg-info/10 text-info",
    icon: "bg-info/10 text-info",
  },
  overdue: {
    label: "Overdue",
    badge: "bg-danger/10 text-danger",
    icon: "bg-danger/10 text-danger",
  },
  neutral: {
    label: "Neutral",
    badge: "bg-black/5 text-text-secondary",
    icon: "bg-black/5 text-text-secondary",
  },
};

export function FollowUpRecallCard({ items = [], className }) {
  return (
    <GlassCard padding="compact" className={cn("space-y-3", className)}>
      <div>
        <h3 className="font-heading text-base font-bold text-text-main xl:text-lg">
          Follow-up & Recall Queue
        </h3>
        <p className="mt-1 text-xs leading-5 text-text-secondary xl:text-sm">
          Upcoming recalls and missed follow-ups that need action.
        </p>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => {
          const meta = statusStyles[item.status] || statusStyles.neutral;
          const Icon = iconMap[item.icon] || ClockAlert;

          return (
            <div
              key={item.id}
              className="flex min-w-0 items-center gap-2.5 rounded-[18px] bg-white/45 p-2.5 xl:gap-3 xl:p-3"
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl xl:h-9 xl:w-9",
                  meta.icon,
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="break-words text-[13px] font-bold leading-5 text-text-main xl:text-sm">
                    {item.label}
                  </p>
                  <span className="text-xs font-bold text-text-muted">{item.count}</span>
                </div>
                <span
                  className={cn(
                    "mt-1 inline-flex max-w-full items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold leading-none",
                    meta.badge,
                  )}
                >
                  {meta.label}
                </span>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-full bg-white/65 px-3 py-1.5 text-xs font-bold text-primary-dark transition hover:bg-primary-soft"
              >
                View
              </button>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
