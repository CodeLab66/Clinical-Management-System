import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { RightPanel } from "@/components/layout/RightPanel";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { cn } from "@/lib/utils";

const activityItems = [
  { id: 1, label: "Appointment request received", status: "new_request" },
  { id: 2, label: "Max moved to consultation", status: "in_consultation" },
  { id: 3, label: "CBC order waiting for sample", status: "lab_pending" },
];

export function AppShell() {
  const location = useLocation();
  const showRightPanel = location.pathname !== "/app/design-system";

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Sidebar />
      <div className="min-h-screen min-w-0 w-full overflow-x-hidden lg:ml-[304px] lg:w-[calc(100vw-304px)]">
        <Topbar />
        <main className="w-full max-w-full overflow-x-hidden px-4 pb-8 md:px-6">
          <div
            className={cn(
              "grid min-w-0 gap-6",
              showRightPanel && "xl:grid-cols-[minmax(0,1fr)_minmax(280px,320px)]",
            )}
          >
            <div className="min-w-0">
              <Outlet />
            </div>
            {showRightPanel ? (
              <RightPanel className="hidden xl:block">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Live Activity
                  </p>
                  <h2 className="mt-1 font-heading text-lg font-bold text-text-main">
                    Clinic Pulse
                  </h2>
                </div>
                <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-text-muted">
                  Mock
                </span>
              </div>
              <div className="space-y-3">
                {activityItems.map((item) => (
                  <div
                    className="rounded-[20px] border border-white/60 bg-white/45 p-4"
                    key={item.id}
                  >
                    <p className="mb-3 text-sm font-semibold text-text-main">
                      {item.label}
                    </p>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
              </RightPanel>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
