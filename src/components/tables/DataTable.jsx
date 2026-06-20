import { StatusBadge } from "@/components/badges/StatusBadge";
import { ActionMenu } from "@/components/ui/ActionMenu";
import { EmptyTableState } from "@/components/tables/EmptyTableState";
import { cn } from "@/lib/utils";

export function DataTable({ columns = [], rows = [], actions, getRowId = (row) => row.id, className }) {
  if (!rows.length) return <EmptyTableState />;

  return (
    <div className={cn("min-w-0 overflow-hidden rounded-[24px] border border-white/60 bg-white/45", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-[760px] text-left text-[0.925rem]">
          <thead className="bg-white/55 text-[11px] uppercase tracking-[0.12em] text-text-muted">
            <tr>
              {columns.map((column) => <th key={column.key} className="whitespace-nowrap px-4 py-4 font-bold">{column.header}</th>)}
              {actions ? <th className="px-4 py-4 text-right font-bold">Actions</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/60">
            {rows.map((row) => (
              <tr key={getRowId(row)} className="transition hover:bg-white/50">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-[18px] align-middle text-text-secondary">
                    {column.type === "status" ? <StatusBadge status={row[column.key]} /> : column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                {actions ? <td className="px-4 py-4 text-right"><ActionMenu items={actions(row)} /></td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
