import { AlertTriangle, X } from "lucide-react";
import { DangerButton } from "@/components/ui/DangerButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { IconButton } from "@/components/ui/IconButton";

export function ConfirmModal({
  open,
  title = "Confirm action",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onClose,
  loading,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-main/30 p-4 backdrop-blur-sm">
      <section className="glass-card w-full max-w-md p-6" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-danger/10 text-danger">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </span>
          <IconButton icon={X} label="Close modal" onClick={onClose} />
        </div>
        <h2 id="confirm-modal-title" className="font-heading text-xl font-bold text-text-main">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p> : null}
        <div className="mt-6 flex justify-end gap-3">
          <GhostButton onClick={onClose}>{cancelLabel}</GhostButton>
          <DangerButton loading={loading} onClick={onConfirm}>{confirmLabel}</DangerButton>
        </div>
      </section>
    </div>
  );
}
