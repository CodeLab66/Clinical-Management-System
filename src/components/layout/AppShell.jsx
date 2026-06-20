import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

const SIDEBAR_STORAGE_KEY = "vetos_sidebar_collapsed";

export function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";
  });

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const sidebarOffset = sidebarCollapsed ? "112px" : "280px";

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-background"
      style={{ "--sidebar-offset": sidebarOffset }}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        isMobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed((current) => !current)}
      />
      <div className="min-h-screen min-w-0 w-full overflow-x-hidden transition-[margin,width] duration-200 ease-in-out lg:ml-[var(--sidebar-offset)] lg:w-[calc(100vw_-_var(--sidebar-offset))]">
        <Topbar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="w-full max-w-full overflow-x-hidden px-4 pb-8 md:px-6 xl:px-8">
          <div className="min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
