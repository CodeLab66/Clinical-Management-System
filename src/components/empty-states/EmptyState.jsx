import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({ icon: Icon = Inbox, title, description, action, className }) {
  return (
    <div className={cn("rounded-[24px] border border-white/60 bg-white/45 p-8 text-center", className)}>
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-heading text-lg font-bold text-text-main">{title}</h3>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-secondary">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
