import { StatusBadge } from "@/components/badges/StatusBadge";
import { ActionMenu } from "@/components/ui/ActionMenu";
import { EmptyTableState } from "@/components/tables/EmptyTableState";
import { cn } from "@/lib/utils";

export function DataTable({ columns = [], rows = [], actions, getRowId = (row) => row.id, className }) {
  if (!rows.length) return <EmptyTableState />;

  return (
    <div className={cn("min-w-0 overflow-hidden rounded-[24px] border border-white/60 bg-white/45", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-[760px] text-left text-[0.84rem] xl:text-[0.925rem]">
          <thead className="bg-white/55 text-[11px] uppercase tracking-[0.12em] text-text-muted">
            <tr>
              {columns.map((column) => <th key={column.key} className="whitespace-nowrap px-3 py-3 font-bold xl:px-4 xl:py-4">{column.header}</th>)}
              {actions ? <th className="px-3 py-3 text-right font-bold xl:px-4 xl:py-4">Actions</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/60">
            {rows.map((row) => (
              <tr key={getRowId(row)} className="transition hover:bg-white/50">
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-3.5 align-middle text-text-secondary xl:px-4 xl:py-[18px]">
                    {column.type === "status" ? <StatusBadge status={row[column.key]} /> : column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                {actions ? <td className="px-3 py-3.5 text-right xl:px-4 xl:py-4"><ActionMenu items={actions(row)} /></td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
