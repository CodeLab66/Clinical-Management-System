import { cn } from "@/lib/utils";

const priorityMeta = {
  normal: ["Normal", "bg-success/12 text-success"],
  urgent: ["Urgent", "bg-warning/15 text-[#8a5a17]"],
  emergency: ["Emergency", "bg-danger/10 text-danger"],
  critical: ["Critical", "bg-danger text-white"],
};

export function PriorityBadge({ priority = "normal", className }) {
  const [label, style] = priorityMeta[priority] || priorityMeta.normal;
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold", style, className)}>{label}</span>;
}
