import { ActivityItem } from "@/components/common/ActivityItem";
import { cn } from "@/lib/utils";

export function ActivityFeed({ items = [], compact = false, className }) {
  return (
    <div className={cn(compact ? "space-y-2.5" : "space-y-3", className)}>
      {items.map((item) => <ActivityItem key={item.id} compact={compact} {...item} />)}
    </div>
  );
}
