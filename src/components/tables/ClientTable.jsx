import { CalendarPlus, Edit, Eye, History, PawPrint } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { DataTable } from "@/components/tables/DataTable";

const money = new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 });

export function ClientTable({ clients, onView, onEdit }) {
  const columns = [
    {
      key: "name",
      header: "Client",
      render: (row) => (
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-xs font-black text-white">
            {row.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
          </span>
          <div>
            <p className="font-bold text-text-main">{row.name}</p>
            <p className="mt-1 text-xs font-semibold text-text-muted">{row.clientId}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", header: "Phone" },
    { key: "email", header: "Email" },
    { key: "petsCount", header: "Pets" },
    { key: "lastVisit", header: "Last Visit" },
    { key: "pendingBalance", header: "Pending Balance", render: (row) => money.format(row.pendingBalance) },
    { key: "preferredBranch", header: "Branch" },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <DataTable
      columns={columns}
      rows={clients}
      actions={(row) => [
        { label: "View Profile", icon: Eye, onClick: () => onView(row) },
        { label: "Edit", icon: Edit, onClick: () => onEdit(row) },
        { label: "Add Pet", icon: PawPrint },
        { label: "Create Appointment", icon: CalendarPlus },
        { label: "View History", icon: History },
      ]}
    />
  );
}
