import { CalendarClock, CheckCircle2, FilePenLine, Pill, Stethoscope } from "lucide-react";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { DataTable } from "@/components/tables/DataTable";

export function ConsultationTable({ consultations, onOpen, onSoap, onPrescription, onFollowUp, onComplete }) {
  const columns = [
    { key: "queueNo", header: "Queue No" },
    { key: "petName", header: "Pet", render: (row) => <div><p className="font-bold text-text-main">{row.petName}</p><p className="text-xs text-text-muted">{row.species} - {row.breed}</p></div> },
    { key: "ownerName", header: "Owner" },
    { key: "service", header: "Service" },
    { key: "doctor", header: "Doctor" },
    { key: "branch", header: "Branch" },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "priority", header: "Priority", render: (row) => <PriorityBadge priority={row.priority} /> },
    { key: "startedAt", header: "Started At" },
  ];

  return (
    <DataTable
      columns={columns}
      rows={consultations}
      actions={(row) => [
        { label: "Open Workspace", icon: Stethoscope, onClick: () => onOpen?.(row) },
        { label: "Add SOAP Note", icon: FilePenLine, onClick: () => onSoap?.(row) },
        { label: "Create Prescription", icon: Pill, onClick: () => onPrescription?.(row) },
        { label: "Schedule Follow-up", icon: CalendarClock, onClick: () => onFollowUp?.(row) },
        { label: "Mark Completed", icon: CheckCircle2, onClick: () => onComplete?.(row) },
      ]}
    />
  );
}
