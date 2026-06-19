import { Bell, CalendarDays, ChevronDown, Menu, Settings } from "lucide-react";
import { useMatches } from "react-router-dom";
import { SearchBar } from "@/components/ui/SearchBar";

export function Topbar() {
  const matches = useMatches();
  const currentTitle =
    [...matches].reverse().find((match) => match.handle?.title)?.handle.title ||
    "Overview";

  return (
    <header className="sticky top-0 z-20 mb-6 w-full max-w-full bg-gradient-to-b from-[#f1f2ee]/95 to-[#f1f2ee]/60 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <button
            className="glass-card-soft inline-flex h-11 w-11 items-center justify-center rounded-full text-text-secondary lg:hidden"
            type="button"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Internal Dashboard
            </p>
            <h2 className="truncate font-heading text-xl font-bold text-text-main">
              {currentTitle}
            </h2>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3 xl:max-w-3xl xl:flex-nowrap">
          <SearchBar className="min-w-[220px] flex-1" />
          <button
            className="glass-card-soft flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-text-secondary"
            type="button"
          >
            DHA Branch
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
            className="flex h-11 w-11 items-center justify-center rounded-full bg-text-main text-sm font-bold text-white shadow-soft"
            type="button"
            aria-label="Current user"
          >
            AU
          </button>
        </div>
      </div>
    </header>
  );
}
