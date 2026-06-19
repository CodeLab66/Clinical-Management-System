import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchInput({ className, placeholder = "Search...", ...props }) {
  return (
    <label className={cn("orange-focus flex min-h-11 items-center gap-3 rounded-full border border-white/60 bg-white/55 px-4 text-sm text-text-muted", className)}>
      <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
      <input className="w-full bg-transparent text-text-main outline-none placeholder:text-text-muted" placeholder={placeholder} type="search" {...props} />
    </label>
  );
}
