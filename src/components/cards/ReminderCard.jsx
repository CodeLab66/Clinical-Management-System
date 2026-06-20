import { BellRing } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";
import { ActionButton } from "@/components/ui/ActionButton";
import { cn } from "@/lib/utils";

const reminderVariants = {
  primary: {
    icon: "bg-primary-soft text-primary-dark",
    button: "primary",
  },
  danger: {
    icon: "bg-danger/10 text-danger",
    button: "danger",
  },
  emergency: {
    icon: "bg-danger/10 text-danger",
    button: "danger",
  },
  warning: {
    icon: "bg-warning/15 text-[#8a5a17]",
    button: "primary",
  },
  neutral: {
    icon: "bg-black/5 text-text-secondary",
    button: "ghost",
  },
};

export function ReminderCard({
  title,
  heading,
  time,
  buttonLabel,
  icon: Icon = BellRing,
  variant = "primary",
  compact = false,
  embedded = false,
  onClick,
  className,
}) {
  const styles = reminderVariants[variant] || reminderVariants.primary;
  const Component = embedded ? "div" : GlassCard;

  return (
    <Component
      className={cn(
        embedded
          ? "rounded-[20px] border border-white/60 bg-white/45"
          : "rounded-[28px] border-white/65 bg-white/70",
        compact ? "p-3.5 xl:p-4" : undefined,
        className,
      )}
    >
      <div className={cn("flex items-center justify-between gap-3 xl:gap-4", compact ? "mb-2.5 xl:mb-3" : "mb-6 xl:mb-8")}>
        <p className={cn("font-bold text-text-secondary", compact ? "text-xs uppercase tracking-[0.12em]" : "text-sm")}>{title}</p>
        <span className={cn("inline-flex items-center justify-center rounded-2xl", compact ? "h-9 w-9" : "h-11 w-11", styles.icon)}>
          <Icon className={cn(compact ? "h-4 w-4" : "h-5 w-5")} aria-hidden="true" />
        </span>
      </div>
      <h3 className={cn("break-words font-heading font-bold leading-tight text-text-main", compact ? "text-[15px] xl:text-base" : "text-xl xl:text-2xl")}>{heading}</h3>
      {time ? <p className={cn("font-semibold text-text-muted", compact ? "mt-2 text-xs" : "mt-3 text-sm")}>{time}</p> : null}
      {buttonLabel ? (
        <ActionButton
          variant={styles.button}
          className={cn("w-full", compact ? "mt-4 min-h-9 px-4 text-xs" : "mt-8")}
          onClick={onClick}
        >
          {buttonLabel}
        </ActionButton>
      ) : null}
    </Component>
  );
}
