import { Bell, CalendarDays, ChevronDown, Menu, Settings } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";

export function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 mb-5 w-full max-w-full bg-gradient-to-b from-[#f1f2ee]/95 to-[#f1f2ee]/60 px-4 py-3.5 backdrop-blur md:px-5 xl:mb-6 xl:px-8 xl:py-4">
      <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            className="glass-card-soft inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-secondary md:hidden"
            type="button"
            aria-label="Open menu"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <SearchBar
            className="min-h-[42px] min-w-0 flex-1 text-xs xl:min-h-[44px] xl:min-w-[420px] xl:text-sm"
            placeholder="Search pets, clients, appointments, lab reports..."
          />
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 xl:flex-nowrap xl:gap-3">
          <button
            className="glass-card-soft flex min-h-[42px] items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-text-secondary xl:min-h-11 xl:gap-2 xl:px-4 xl:text-sm"
            type="button"
          >
            All Branches
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            className="glass-card-soft flex min-h-[42px] items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-text-secondary xl:min-h-11 xl:gap-2 xl:px-4 xl:text-sm"
            type="button"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Today
          </button>
          <button
            className="glass-card-soft inline-flex h-[42px] w-[42px] items-center justify-center rounded-full text-text-secondary xl:h-11 xl:w-11"
            type="button"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            className="glass-card-soft inline-flex h-[42px] w-[42px] items-center justify-center rounded-full text-text-secondary xl:h-11 xl:w-11"
            type="button"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            className="flex min-h-[42px] items-center gap-2 rounded-full bg-white/60 py-1 pl-1 pr-3 text-xs font-bold text-text-main shadow-soft xl:min-h-11 xl:gap-3 xl:pr-4 xl:text-sm"
            type="button"
            aria-label="Current user"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-text-main text-xs text-white">
              AU
            </span>
            <span className="hidden xl:inline">Admin User</span>
          </button>
        </div>
      </div>
    </header>
  );
}
