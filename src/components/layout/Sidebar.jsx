import { HeartPulse, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { sidebarSections } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Sidebar({ isMobileOpen = false, onClose }) {
  return (
    <>
      {isMobileOpen ? (
        <button
          className="fixed inset-0 z-40 bg-text-main/25 backdrop-blur-sm lg:hidden"
          type="button"
          aria-label="Close menu"
          onClick={onClose}
        />
      ) : null}
      <aside
        className={cn(
          "glass-card fixed inset-y-4 left-4 z-50 flex w-[272px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden p-4 transition-transform duration-200 lg:z-30 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0",
        )}
      >
        <div className="flex items-center gap-3 px-2 pb-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-soft">
            <HeartPulse className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-lg font-extrabold text-text-main">
              VetOS Pro
            </p>
            <p className="text-xs font-medium text-text-muted">
              Veterinary Clinic OS
            </p>
          </div>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-text-secondary lg:hidden"
            type="button"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 overflow-y-auto pr-1">
          {sidebarSections.map((section) => (
            <div className="mb-5" key={section.label}>
              <p className="sidebar-section-label mb-2 px-3">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "flex min-h-10 items-center gap-3 rounded-full px-3 text-sm font-semibold transition",
                        isActive
                          ? "bg-primary text-white shadow-[0_12px_25px_rgba(233,120,58,0.25)]"
                          : "text-text-secondary hover:bg-white/65 hover:text-text-main",
                      )
                    }
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                  >
                    <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
