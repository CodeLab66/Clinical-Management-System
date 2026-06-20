import { Eye, LogIn, RefreshCw, Send, XCircle } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { DataTable } from "@/components/tables/DataTable";

export function AppointmentTable({ appointments, onView, onCheckIn, onReschedule, onCancel }) {
  const columns = [
    { key: "time", header: "Time" },
    { key: "petName", header: "Pet", render: (row) => <div><p className="font-bold text-text-main">{row.petName}</p><PriorityBadge priority={row.priority} /></div> },
    { key: "ownerName", header: "Owner" },
    { key: "service", header: "Service" },
    { key: "doctor", header: "Doctor" },
    { key: "branch", header: "Branch" },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "paymentStatus", header: "Payment", render: (row) => <StatusBadge status={row.paymentStatus} /> },
  ];

  return (
    <DataTable
      columns={columns}
      rows={appointments}
      actions={(row) => [
        { label: "View", icon: Eye, onClick: () => onView(row) },
        { label: "Check In", icon: LogIn, onClick: () => onCheckIn(row) },
        { label: "Reschedule", icon: RefreshCw, onClick: () => onReschedule(row) },
        { label: "Cancel", icon: XCircle, onClick: () => onCancel(row) },
        { label: "Send Reminder", icon: Send },
      ]}
    />
  );
}
