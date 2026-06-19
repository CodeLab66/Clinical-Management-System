import { SearchInput } from "@/components/forms/SearchInput";
import { cn } from "@/lib/utils";

export function TableToolbar({ title, searchPlaceholder, actions, children, className }) {
  return (
    <div className={cn("mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", className)}>
      <div>
        {title ? <h3 className="font-heading text-lg font-bold text-text-main">{title}</h3> : null}
        {children}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput className="min-w-[220px]" placeholder={searchPlaceholder} />
        {actions}
      </div>
    </div>
  );
}
