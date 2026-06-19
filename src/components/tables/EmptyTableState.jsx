import { EmptyState } from "@/components/empty-states/EmptyState";

export function EmptyTableState({ title = "No records found", description = "Try changing filters or adding a new record." }) {
  return <EmptyState title={title} description={description} />;
}
