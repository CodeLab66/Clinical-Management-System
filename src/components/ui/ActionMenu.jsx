import { MoreHorizontal } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";

export function ActionMenu({ items = [], label = "Actions", className }) {
  return (
    <div className={cn("group relative inline-flex", className)}>
      <IconButton icon={MoreHorizontal} label={label} />
      <div className="pointer-events-none absolute right-0 top-full z-40 mt-2 min-w-44 translate-y-1 rounded-[18px] border border-white/60 bg-white/90 p-2 opacity-0 shadow-soft backdrop-blur transition group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className="flex w-full items-center gap-2 rounded-full px-3 py-2 text-left text-sm font-semibold text-text-secondary hover:bg-primary-soft hover:text-primary-dark"
          >
            {item.icon ? <item.icon className="h-4 w-4" aria-hidden="true" /> : null}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
