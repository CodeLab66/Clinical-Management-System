import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

const SIDEBAR_STORAGE_KEY = "vetos_sidebar_collapsed";

export function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTabletViewport, setIsTabletViewport] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches;
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    const storedValue = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (storedValue != null) return storedValue === "true";
    return window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches;
  });

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    const tabletQuery = window.matchMedia("(min-width: 768px) and (max-width: 1279px)");
    const handleChange = () => setIsTabletViewport(tabletQuery.matches);

    handleChange();
    tabletQuery.addEventListener("change", handleChange);
    return () => tabletQuery.removeEventListener("change", handleChange);
  }, []);

  const effectiveSidebarCollapsed = sidebarCollapsed || isTabletViewport;

  return (
    <div
      className="app-shell min-h-screen w-full overflow-x-hidden bg-background"
      data-sidebar-collapsed={effectiveSidebarCollapsed}
    >
      <Sidebar
        collapsed={effectiveSidebarCollapsed}
        isMobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed((current) => !current)}
      />
      <div className="app-content min-h-screen min-w-0 w-full overflow-x-hidden transition-[margin,width] duration-200 ease-in-out">
        <Topbar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="w-full max-w-full overflow-x-hidden px-4 pb-8 md:px-5 xl:px-8">
          <div className="min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
