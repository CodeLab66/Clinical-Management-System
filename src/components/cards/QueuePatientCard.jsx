import { AlertTriangle, CheckCircle2, FlaskConical, Pill, Stethoscope, WalletCards } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { ActionButton } from "@/components/ui/ActionButton";

export function QueuePatientCard({ item, onMove, onEmergency, onRemove }) {
  const alert = item.alerts?.[0];

  return (
    <article className="queue-patient-card rounded-[20px] border border-white/65 bg-white/65 p-3 shadow-soft">
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-primary">{item.queueNo}</p>
            <h3 className="mt-1 truncate font-heading text-base font-bold text-text-main">{item.petName}</h3>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <PriorityBadge priority={item.priority} />
          </div>
        </div>

        <div className="mt-3 space-y-1 text-xs leading-5 text-text-secondary">
          <p className="truncate"><span className="font-bold text-text-muted">Owner:</span> {item.ownerName}</p>
          <p className="truncate"><span className="font-bold text-text-muted">Service:</span> {item.service}</p>
          <p className="truncate"><span className="font-bold text-text-muted">Doctor:</span> {item.doctor}</p>
          <p className="truncate"><span className="font-bold text-text-muted">Branch:</span> {item.branch}</p>
          <p className="truncate"><span className="font-bold text-text-muted">Wait:</span> {item.waitTime} - <span className="font-bold text-text-muted">Payment:</span> {item.paymentStatus}</p>
        </div>

        {alert ? (
          <p className="mt-2 truncate rounded-full bg-warning/15 px-2 py-1 text-[10px] font-bold text-[#8a5a17]">{alert}</p>
        ) : null}
      </div>

      <div className="mt-3 space-y-2 pt-1">
        <div className="queue-card-actions">
          <ActionButton icon={Stethoscope} className="queue-action-primary" onClick={() => onMove(item, "consultation")}>Consult</ActionButton>
          <ActionButton icon={FlaskConical} variant="ghost" className="queue-action-secondary queue-action-lab" onClick={() => onMove(item, "lab")}>Lab</ActionButton>
          <ActionButton icon={Pill} variant="ghost" className="queue-action-secondary queue-action-pharmacy" onClick={() => onMove(item, "pharmacy")}>Pharmacy</ActionButton>
          <ActionButton icon={WalletCards} variant="ghost" className="queue-action-secondary queue-action-billing" onClick={() => onMove(item, "billing")}>Billing</ActionButton>
          <ActionButton icon={CheckCircle2} variant="ghost" className="queue-action-secondary queue-action-done" onClick={() => onMove(item, "completed")}>Done</ActionButton>
          <ActionButton icon={AlertTriangle} variant="danger" className="queue-action-danger" onClick={() => onEmergency(item)}>Emergency</ActionButton>
        </div>
        <button type="button" className="remove-from-queue" onClick={() => onRemove(item)}>
          Remove from queue
        </button>
      </div>
    </article>
  );
}
