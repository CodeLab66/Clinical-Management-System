import { cn } from "@/lib/utils";

const priorityMeta = {
  normal: ["Normal", "bg-success/12 text-success"],
  urgent: ["Urgent", "bg-warning/15 text-[#8a5a17]"],
  emergency: ["Emergency", "bg-danger/10 text-danger"],
  critical: ["Critical", "bg-danger text-white"],
};

export function PriorityBadge({ priority = "normal", className }) {
  const [label, style] = priorityMeta[priority] || priorityMeta.normal;
  return <span className={cn("inline-flex max-w-full items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold leading-none", style, className)}>{label}</span>;
}
