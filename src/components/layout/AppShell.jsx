import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background">
      <Sidebar
        isMobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <div className="min-h-screen min-w-0 w-full overflow-x-hidden lg:ml-[304px] lg:w-[calc(100vw-304px)]">
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
