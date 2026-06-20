import { cn } from "@/lib/utils";

export function PageHeader({ title, subtitle, breadcrumbs, actions, className }) {
  return (
    <div className={cn("flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between", className)}>
      <div className="min-w-0">
        {breadcrumbs ? <div className="mb-2 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">{breadcrumbs}</div> : null}
        <h1 className="font-heading text-[23px] font-bold leading-tight text-text-main md:text-[25px] xl:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1.5 max-w-3xl text-sm leading-6 text-text-secondary md:text-[13px] xl:mt-2 xl:text-sm">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
