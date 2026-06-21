import { Ban, Eye, Pencil, Printer, Send } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { DataTable } from "@/components/tables/DataTable";

export function PrescriptionTable({ prescriptions, onView, onEdit, onSend, onPrint, onCancel }) {
  const columns = [
    { key: "id", header: "Prescription ID" },
    { key: "petName", header: "Pet", render: (row) => <div><p className="font-bold text-text-main">{row.petName}</p><p className="text-xs text-text-muted">{row.diagnosis}</p></div> },
    { key: "ownerName", header: "Owner" },
    { key: "doctor", header: "Doctor" },
    { key: "medicines", header: "Medicines", render: (row) => `${row.medicines?.length || 0} items` },
    { key: "branch", header: "Branch" },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "createdAt", header: "Created At" },
  ];

  return (
    <DataTable
      columns={columns}
      rows={prescriptions}
      actions={(row) => [
        { label: "View", icon: Eye, onClick: () => onView?.(row) },
        { label: "Edit", icon: Pencil, onClick: () => onEdit?.(row) },
        { label: "Send To Pharmacy", icon: Send, onClick: () => onSend?.(row) },
        { label: "Print", icon: Printer, onClick: () => onPrint?.(row) },
        { label: "Cancel", icon: Ban, onClick: () => onCancel?.(row) },
      ]}
    />
  );
}
