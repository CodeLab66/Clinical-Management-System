import { HeartPulse } from "lucide-react";
import { NavLink } from "react-router-dom";
import { sidebarSections } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <aside className="glass-card fixed inset-y-4 left-4 z-30 hidden w-[272px] overflow-hidden p-4 lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-2 pb-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-soft">
          <HeartPulse className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading text-lg font-extrabold text-text-main">
            VetOS Pro
          </p>
          <p className="text-xs font-medium text-text-muted">
            Clinic Command Center
          </p>
        </div>
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
  );
}
