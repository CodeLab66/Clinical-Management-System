import { cn } from "@/lib/utils";

export function PageHeader({ title, subtitle, breadcrumbs, actions, className }) {
  return (
    <div className={cn("flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="min-w-0">
        {breadcrumbs ? <div className="mb-2 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">{breadcrumbs}</div> : null}
        <h1 className="font-heading text-2xl font-bold text-text-main md:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
