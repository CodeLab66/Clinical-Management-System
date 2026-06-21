import { CalendarClock, Eye, FilePlus2, Pill } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { DataTable } from "@/components/tables/DataTable";

export function MedicalRecordsTable({ records, onView, onAddNote, onPrescription, onFollowUp }) {
  const columns = [
    { key: "petName", header: "Pet", render: (row) => <div><p className="font-bold text-text-main">{row.petName}</p><p className="text-xs text-text-muted">{row.species} - {row.breed}</p></div> },
    { key: "ownerName", header: "Owner" },
    { key: "lastDiagnosis", header: "Last Diagnosis" },
    { key: "lastVisit", header: "Last Visit" },
    { key: "doctor", header: "Doctor" },
    { key: "branch", header: "Branch" },
    { key: "alerts", header: "Alerts", render: (row) => row.alerts?.length ? row.alerts.join(", ") : "None" },
    { key: "followUp", header: "Follow-up" },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <DataTable
      columns={columns}
      rows={records}
      actions={(row) => [
        { label: "View Record", icon: Eye, onClick: () => onView?.(row) },
        { label: "Add Note", icon: FilePlus2, onClick: () => onAddNote?.(row) },
        { label: "Create Prescription", icon: Pill, onClick: () => onPrescription?.(row) },
        { label: "Schedule Follow-up", icon: CalendarClock, onClick: () => onFollowUp?.(row) },
      ]}
    />
  );
}
