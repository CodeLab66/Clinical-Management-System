import { cn } from "@/lib/utils";

export function MiniLegend({ items = [], compact = false, className }) {
  return (
    <div className={cn("flex min-w-0 flex-wrap items-center", compact ? "gap-x-3 gap-y-1.5" : "gap-x-5 gap-y-2", className)}>
      {items.map((item) => (
        <div key={item.label} className="flex min-w-0 items-center gap-2 text-xs font-semibold text-text-muted">
          <span
            className={cn(
              "h-2.5 w-2.5 shrink-0 rounded-full",
              item.pattern && "chart-legend-stripe rounded-[5px]",
            )}
            style={item.pattern ? undefined : { backgroundColor: item.color }}
            aria-hidden="true"
          />
          <span className="min-w-0 truncate">{item.label}</span>
          {item.value ? <span className="font-bold text-text-secondary">{item.value}</span> : null}
        </div>
      ))}
    </div>
  );
}
