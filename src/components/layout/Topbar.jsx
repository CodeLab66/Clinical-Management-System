import { Bell, CalendarDays, ChevronDown, Menu, Settings } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";

export function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 mb-6 w-full max-w-full bg-gradient-to-b from-[#f1f2ee]/95 to-[#f1f2ee]/60 px-4 py-4 backdrop-blur md:px-6 xl:px-8">
      <div className="flex min-w-0 flex-col gap-3 xl:flex-row xl:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            className="glass-card-soft inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-secondary lg:hidden"
            type="button"
            aria-label="Open menu"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <SearchBar
            className="min-h-[44px] min-w-0 flex-1 xl:min-w-[420px]"
            placeholder="Search pets, clients, appointments, lab reports..."
          />
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3 xl:flex-nowrap">
          <button
            className="glass-card-soft flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-text-secondary"
            type="button"
          >
            All Branches
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            className="glass-card-soft flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-text-secondary"
            type="button"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Today
          </button>
          <button
            className="glass-card-soft inline-flex h-11 w-11 items-center justify-center rounded-full text-text-secondary"
            type="button"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            className="glass-card-soft inline-flex h-11 w-11 items-center justify-center rounded-full text-text-secondary"
            type="button"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            className="flex min-h-11 items-center gap-3 rounded-full bg-white/60 py-1 pl-1 pr-4 text-sm font-bold text-text-main shadow-soft"
            type="button"
            aria-label="Current user"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-text-main text-xs text-white">
              AU
            </span>
            <span className="hidden sm:inline">Admin User</span>
          </button>
        </div>
      </div>
    </header>
  );
}
