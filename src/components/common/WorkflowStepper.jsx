import {
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FlaskConical,
  LogIn,
  Pill,
  ReceiptText,
  Stethoscope,
} from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { cn } from "@/lib/utils";

const iconMap = {
  requests: ClipboardList,
  confirmed: CalendarCheck,
  checked_in: LogIn,
  consultation: Stethoscope,
  lab_pharmacy: Pill,
  lab: FlaskConical,
  billing: ReceiptText,
  completed: CheckCircle2,
};

const toneMap = {
  completed: {
    icon: "bg-success/15 text-success shadow-[inset_0_0_0_1px_rgba(79,143,104,0.16)]",
    line: "bg-success/35",
    label: "text-success",
    badge: "completed",
  },
  active: {
    icon: "bg-primary-soft text-primary-dark shadow-[inset_0_0_0_1px_rgba(233,120,58,0.18)]",
    line: "bg-primary/35",
    label: "text-primary-dark",
    badge: "in_consultation",
  },
  pending: {
    icon: "bg-warning/15 text-[#8a5a17] shadow-[inset_0_0_0_1px_rgba(233,162,59,0.18)]",
    line: "bg-warning/30",
    label: "text-[#8a5a17]",
    badge: "pending",
  },
  waiting: {
    icon: "bg-warning/15 text-[#8a5a17] shadow-[inset_0_0_0_1px_rgba(233,162,59,0.18)]",
    line: "bg-warning/30",
    label: "text-[#8a5a17]",
    badge: "waiting",
  },
  incomplete: {
    icon: "bg-black/5 text-text-muted shadow-[inset_0_0_0_1px_rgba(21,21,21,0.06)]",
    line: "bg-black/10",
    label: "text-text-muted",
    badge: "pending",
  },
  critical: {
    icon: "bg-danger/10 text-danger shadow-[inset_0_0_0_1px_rgba(214,69,69,0.16)]",
    line: "bg-danger/30",
    label: "text-danger",
    badge: "critical",
  },
};

function getStepState(step, index, current) {
  if (step.step_state) return step.step_state;
  if (step.state) return step.state;
  if (index < current) return "completed";
  if (index === current) return "active";
  return "incomplete";
}

export function WorkflowStepper({
  steps = [],
  current = 0,
  layout = "vertical",
  compact = false,
  showBadges = true,
  className,
}) {
  const isHorizontal = layout === "horizontal";

  return (
    <div
      className={cn(
        "min-w-0 rounded-[22px] bg-white/42",
        compact ? "p-3" : "p-4",
        isHorizontal ? "grid gap-3 md:grid-cols-7" : "space-y-2.5",
        className,
      )}
    >
      {steps.map((step, index) => {
        const state = getStepState(step, index, current);
        const tone = toneMap[state] || toneMap.incomplete;
        const Icon = step.icon || iconMap[step.icon_key] || iconMap[step.type] || BadgeCheck;
        const count = step.value ?? step.count;
        const badgeStatus = step.badge_status || step.status || tone.badge;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id || step.label || step.title} className="relative min-w-0">
            {isHorizontal && !isLast ? (
              <span
                className={cn("absolute left-10 top-5 hidden h-0.5 w-[calc(100%-1.25rem)] md:block", tone.line)}
                aria-hidden="true"
              />
            ) : null}
            {!isHorizontal && !isLast ? (
              <span
                className={cn("absolute bottom-[-12px] left-5 top-11 w-0.5", tone.line)}
                aria-hidden="true"
              />
            ) : null}
            <div
              className={cn(
                "relative z-10 flex min-w-0 gap-3 rounded-[18px] bg-white/45",
                compact ? "p-2.5" : "p-3",
                isHorizontal ? "md:flex-col" : "items-center",
              )}
            >
              <span className={cn("flex shrink-0 items-center justify-center rounded-2xl", compact ? "h-9 w-9" : "h-10 w-10", tone.icon)}>
                <Icon className={cn(compact ? "h-4 w-4" : "h-5 w-5")} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-bold leading-5 text-text-main">
                  {step.short_title || step.label || step.title}
                </p>
                <p className={cn("mt-0.5 text-xs font-bold", tone.label)}>
                  {count != null ? `${count} cases` : step.description}
                </p>
              </div>
              {showBadges && !isHorizontal ? (
                <StatusBadge status={badgeStatus} className="shrink-0" />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
