import { getRoleMeta } from "@/constants/roles";
import { toneClasses } from "@/constants/theme";
import { cn } from "@/lib/utils";

export function RoleBadge({ role = "viewer", className }) {
  const meta = getRoleMeta(role);
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold", toneClasses[meta.color], className)}>{meta.label}</span>;
}
