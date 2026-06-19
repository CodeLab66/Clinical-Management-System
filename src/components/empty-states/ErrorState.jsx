import { AlertCircle } from "lucide-react";
import { DangerButton } from "@/components/ui/DangerButton";
import { EmptyState } from "@/components/empty-states/EmptyState";

export function ErrorState({ title = "Something went wrong", description = "Please retry the action.", onRetry }) {
  return (
    <EmptyState
      icon={AlertCircle}
      title={title}
      description={description}
      action={onRetry ? <DangerButton onClick={onRetry}>Retry</DangerButton> : null}
    />
  );
}
