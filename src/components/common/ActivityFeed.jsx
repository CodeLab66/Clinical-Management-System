import { ActivityItem } from "@/components/common/ActivityItem";

export function ActivityFeed({ items = [] }) {
  return <div className="space-y-3">{items.map((item) => <ActivityItem key={item.id} {...item} />)}</div>;
}
