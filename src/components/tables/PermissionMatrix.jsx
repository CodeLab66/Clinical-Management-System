import { EmptyState } from "@/components/empty-states/EmptyState";
import { cn } from "@/lib/utils";

export function PermissionMatrix({ modules = [], actions = [], permissions = {}, onToggle }) {
  const selectedCount = Object.values(permissions).reduce((total, moduleActions = []) => total + moduleActions.length, 0);

  if (!selectedCount) {
    return (
      <EmptyState
        title="No permissions selected"
        description="Choose a role or enable module actions to build an access profile."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/60 bg-white/45">
      <div className="overflow-x-auto">
        <table className="min-w-[780px] text-left text-sm">
          <thead className="bg-white/55 text-[11px] uppercase tracking-[0.12em] text-text-muted">
            <tr>
              <th className="px-4 py-4 font-bold">Module</th>
              {actions.map((action) => (
                <th key={action} className="px-3 py-4 text-center font-bold">{action}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/60">
            {modules.map((module) => {
              const modulePermissions = permissions[module] || [];
              return (
                <tr key={module} className="hover:bg-white/45">
                  <td className="px-4 py-3 font-bold text-text-main">{module}</td>
                  {actions.map((action) => {
                    const checked = modulePermissions.includes(action);
                    return (
                      <td key={action} className="px-3 py-3 text-center">
                        <button
                          type="button"
                          aria-pressed={checked}
                          onClick={() => onToggle?.(module, action)}
                          className={cn(
                            "mx-auto flex h-6 w-11 items-center rounded-full p-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                            checked ? "bg-primary" : "bg-black/10",
                          )}
                        >
                          <span
                            className={cn(
                              "h-4 w-4 rounded-full bg-white shadow-sm transition",
                              checked ? "translate-x-5" : "translate-x-0",
                            )}
                          />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
