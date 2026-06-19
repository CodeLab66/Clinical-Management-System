import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";
import { toneClasses } from "@/constants/theme";
import { cn } from "@/lib/utils";

const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
  info: Info,
  neutral: Info,
};

export function AlertCard({ severity = "neutral", title, description, action, className }) {
  const Icon = icons[severity] || Info;

  return (
    <GlassCard className={cn("flex items-start gap-4", className)}>
      <span className={cn("inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl", toneClasses[severity])}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-base font-bold text-text-main">{title}</h3>
        {description ? <p className="mt-1 text-sm leading-6 text-text-secondary">{description}</p> : null}
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </GlassCard>
  );
}
