import { CalendarClock, MessageCircle, Phone, UserCheck, XCircle } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { ActionButton } from "@/components/ui/ActionButton";
import { cn } from "@/lib/utils";

export function AppointmentRequestCard({ request, onReview, onConfirm, onAssign, onCancel }) {
  return (
    <article className="appointment-request-card rounded-[20px] border border-white/65 bg-white/60 p-3 shadow-soft xl:p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-heading text-base font-bold text-text-main">{request.petName}</p>
          <p className="mt-1 truncate text-xs font-semibold text-text-muted">{request.ownerName} - {request.phone}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <PriorityBadge priority={request.priority} />
          <StatusBadge status={request.status} />
        </div>
      </div>

      <dl className="mt-3 grid gap-1.5 text-xs text-text-secondary">
        <div className="flex justify-between gap-3">
          <dt className="font-bold text-text-muted">Service</dt>
          <dd className="truncate text-right font-semibold">{request.serviceType}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-bold text-text-muted">Branch</dt>
          <dd className="truncate text-right font-semibold">{request.preferredBranch}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-bold text-text-muted">Preferred</dt>
          <dd className="truncate text-right font-semibold">{request.preferredDate} {request.preferredTime}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-bold text-text-muted">Source</dt>
          <dd className="truncate text-right font-semibold">{request.source}</dd>
        </div>
      </dl>

      <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-text-secondary">{request.symptoms}</p>
      <p className="mt-2 text-xs font-bold text-text-muted">Created {request.createdLabel}</p>

      <div className="mt-3 space-y-2">
        <ActionButton icon={CalendarClock} className="min-h-[32px] w-full px-3 text-[11px] shadow-none" onClick={() => onReview(request)}>Review</ActionButton>
        <div className="request-card-actions">
          <ActionButton icon={UserCheck} variant="ghost" className="min-h-[30px] px-2 text-[11px]" onClick={() => onConfirm(request)}>Confirm</ActionButton>
          <ActionButton icon={UserCheck} variant="ghost" className="min-h-[30px] px-2 text-[11px]" onClick={() => onAssign(request)}>Assign</ActionButton>
          <ActionButton icon={Phone} variant="ghost" className="min-h-[30px] px-2 text-[11px]">Call</ActionButton>
          <ActionButton icon={MessageCircle} variant="ghost" className="min-h-[30px] px-2 text-[11px]">WhatsApp</ActionButton>
        </div>
        <ActionButton icon={XCircle} variant="danger" className={cn("min-h-[30px] w-full px-3 text-[11px] shadow-none", request.status === "cancelled" && "hidden")} onClick={() => onCancel(request)}>Cancel</ActionButton>
      </div>
    </article>
  );
}
