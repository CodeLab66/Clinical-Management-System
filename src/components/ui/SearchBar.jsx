import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBar({ className, placeholder = "Search clients, pets, visits..." }) {
  return (
    <label
      className={cn(
        "glass-card-soft flex min-h-11 items-center gap-3 rounded-full px-4 text-sm text-text-muted",
        className,
      )}
    >
      <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
      <input
        className="w-full bg-transparent text-text-main outline-none placeholder:text-text-muted"
        placeholder={placeholder}
        type="search"
      />
    </label>
  );
}
