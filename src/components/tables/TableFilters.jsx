import { cn } from "@/lib/utils";

export function TableFilters({ filters = [], active, onChange, className }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onChange?.(filter.value)}
          className={cn("rounded-full px-4 py-2 text-sm font-bold transition", active === filter.value ? "bg-primary text-white" : "bg-white/55 text-text-secondary hover:bg-white/80")}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
