import { HeartPulse, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { sidebarSections } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Sidebar({
  collapsed = false,
  isMobileOpen = false,
  onClose,
  onToggleCollapse,
}) {
  const isCollapsed = collapsed && !isMobileOpen;

  return (
    <>
      {isMobileOpen ? (
        <button
          className="fixed inset-0 z-40 bg-text-main/25 backdrop-blur-sm md:hidden"
          type="button"
          aria-label="Close menu"
          onClick={onClose}
        />
      ) : null}
      <aside
        className={cn(
          "glass-card fixed inset-y-4 left-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col overflow-hidden p-4 transition-[transform,width,padding] duration-200 ease-in-out md:z-30 md:translate-x-0",
          isCollapsed ? "w-20 px-3" : "w-[248px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-[120%] md:translate-x-0",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 pb-5",
            isCollapsed ? "flex-col justify-center px-0" : "px-2",
          )}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-soft">
            <HeartPulse className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className={cn("min-w-0 flex-1 transition-opacity duration-150", isCollapsed && "hidden")}>
            <p className="font-heading text-lg font-extrabold text-text-main">
              VetOS Pro
            </p>
            <p className="text-xs font-medium text-text-muted">
              Veterinary Clinic OS
            </p>
          </div>
          {onToggleCollapse ? (
            <button
              className={cn(
                "hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/60 text-text-secondary transition hover:bg-primary-soft hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:inline-flex",
              )}
              type="button"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={onToggleCollapse}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
              ) : (
                <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          ) : null}
          <button
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-text-secondary md:hidden",
              isCollapsed && "hidden",
            )}
            type="button"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav className={cn("scrollbar-thin flex-1 overflow-y-auto", isCollapsed ? "pr-0" : "pr-1")}>
          {sidebarSections.map((section) => (
            <div className={cn("mb-5", isCollapsed && "mb-3")} key={section.label}>
              {isCollapsed ? (
                <div className="mx-auto mb-2 h-px w-8 rounded-full bg-text-muted/20" />
              ) : (
                <p className="sidebar-section-label mb-2 px-3">
                  {section.label}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "flex min-h-10 items-center rounded-full text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                        isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                        isActive
                          ? "bg-primary text-white shadow-[0_12px_25px_rgba(233,120,58,0.25)]"
                          : "text-text-secondary hover:bg-white/65 hover:text-text-main",
                      )
                    }
                    key={item.href}
                    to={item.href}
                    title={isCollapsed ? item.label : undefined}
                    onClick={onClose}
                  >
                    <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className={cn("truncate", isCollapsed && "hidden")}>{item.label}</span>
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
