import { cn } from "@/lib/utils";

export function FormSection({ title, helper, children, className }) {
  return (
    <section className={cn("space-y-4", className)}>
      {(title || helper) && (
        <div>
          {title ? <h4 className="font-heading text-base font-bold text-text-main">{title}</h4> : null}
          {helper ? <p className="mt-1 text-sm text-text-secondary">{helper}</p> : null}
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}
