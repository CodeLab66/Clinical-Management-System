import { QuickActionCard } from "@/components/cards/QuickActionCard";

export function QuickActionsPanel({ actions = [] }) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 13rem), 1fr))" }}
    >
      {actions.map((action) => <QuickActionCard key={action.title} {...action} />)}
    </div>
  );
}
