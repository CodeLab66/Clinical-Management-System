import { AlertTriangle, ShieldAlert } from "lucide-react";

export function MedicalAlertCard({ alerts = [], compact = false }) {
  const hasAlerts = alerts.length > 0;

  return (
    <section className={`rounded-[22px] border ${hasAlerts ? "border-danger/20 bg-danger/8" : "border-white/60 bg-white/45"} p-4`}>
      <div className="flex items-center gap-2">
        {hasAlerts ? <AlertTriangle className="h-4 w-4 text-danger" aria-hidden="true" /> : <ShieldAlert className="h-4 w-4 text-success" aria-hidden="true" />}
        <h3 className="font-heading text-sm font-bold text-text-main">Medical Alerts</h3>
      </div>
      <div className={compact ? "mt-3 flex flex-wrap gap-2" : "mt-3 space-y-2"}>
        {hasAlerts ? alerts.map((alert) => (
          <span key={alert} className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-danger">{alert}</span>
        )) : <p className="text-sm text-text-secondary">No active alerts recorded.</p>}
      </div>
    </section>
  );
}
