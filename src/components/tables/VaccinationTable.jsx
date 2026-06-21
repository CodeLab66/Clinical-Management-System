import { BellPlus, Eye, Pencil, Syringe } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { DataTable } from "@/components/tables/DataTable";

export function VaccinationTable({ records, onMarkGiven, onReminder, onView, onEdit }) {
  const columns = [
    { key: "petName", header: "Pet", render: (row) => <div><p className="font-bold text-text-main">{row.petName}</p><p className="text-xs text-text-muted">{row.species}</p></div> },
    { key: "ownerName", header: "Owner" },
    { key: "type", header: "Type" },
    { key: "vaccineOrDewormer", header: "Vaccine/Dewormer" },
    { key: "lastGiven", header: "Last Given" },
    { key: "nextDue", header: "Next Due" },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "branch", header: "Branch" },
  ];

  return (
    <DataTable
      columns={columns}
      rows={records}
      actions={(row) => [
        { label: "Mark Given", icon: Syringe, onClick: () => onMarkGiven?.(row) },
        { label: "Schedule Reminder", icon: BellPlus, onClick: () => onReminder?.(row) },
        { label: "View Pet", icon: Eye, onClick: () => onView?.(row) },
        { label: "Edit Record", icon: Pencil, onClick: () => onEdit?.(row) },
      ]}
    />
  );
}
