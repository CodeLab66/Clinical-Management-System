import { CalendarClock, CheckCircle2, Eye, MessageCircle, Phone } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { DataTable } from "@/components/tables/DataTable";

export function FollowUpsTable({ followUps, onComplete, onReschedule, onView }) {
  const columns = [
    { key: "petName", header: "Pet", render: (row) => <div><p className="font-bold text-text-main">{row.petName}</p><p className="text-xs text-text-muted">{row.branch}</p></div> },
    { key: "ownerName", header: "Owner" },
    { key: "reason", header: "Reason" },
    { key: "relatedVisit", header: "Related Visit" },
    { key: "doctor", header: "Doctor" },
    { key: "dueDate", header: "Due Date" },
    { key: "priority", header: "Priority", render: (row) => <PriorityBadge priority={row.priority} /> },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <DataTable
      columns={columns}
      rows={followUps}
      actions={(row) => [
        { label: "Mark Completed", icon: CheckCircle2, onClick: () => onComplete?.(row) },
        { label: "Reschedule", icon: CalendarClock, onClick: () => onReschedule?.(row) },
        { label: "Call Client", icon: Phone, onClick: () => {} },
        { label: "WhatsApp", icon: MessageCircle, onClick: () => {} },
        { label: "View Record", icon: Eye, onClick: () => onView?.(row) },
      ]}
    />
  );
}
