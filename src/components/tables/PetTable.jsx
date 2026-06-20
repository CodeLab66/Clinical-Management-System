import { AlertTriangle, CalendarPlus, Edit, Eye, History } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { DataTable } from "@/components/tables/DataTable";

export function PetTable({ pets, onView, onEdit, onAlert }) {
  const columns = [
    {
      key: "name",
      header: "Pet",
      render: (row) => (
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-xs font-black text-white">
            {row.name.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <p className="font-bold text-text-main">{row.name}</p>
            <p className="mt-1 text-xs font-semibold text-text-muted">{row.petId}</p>
          </div>
        </div>
      ),
    },
    { key: "ownerName", header: "Owner" },
    { key: "species", header: "Species/Breed", render: (row) => `${row.species} / ${row.breed}` },
    { key: "age", header: "Age" },
    { key: "weight", header: "Weight" },
    { key: "lastVisit", header: "Last Visit" },
    { key: "vaccineStatus", header: "Vaccine Status" },
    { key: "medicalAlert", header: "Medical Alert", render: (row) => <StatusBadge status={row.medicalAlert} /> },
  ];

  return (
    <DataTable
      columns={columns}
      rows={pets}
      actions={(row) => [
        { label: "View Profile", icon: Eye, onClick: () => onView(row) },
        { label: "Edit", icon: Edit, onClick: () => onEdit(row) },
        { label: "Create Appointment", icon: CalendarPlus },
        { label: "Add Medical Alert", icon: AlertTriangle, onClick: () => onAlert(row) },
        { label: "View Timeline", icon: History },
      ]}
    />
  );
}
