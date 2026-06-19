import { FileText } from "lucide-react";
import { DetailModal } from "@/components/modals/DetailModal";

export function PreviewModal({ open, title = "Preview", subtitle, children, onClose }) {
  return (
    <DetailModal open={open} title={title} subtitle={subtitle} onClose={onClose}>
      {children || (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[24px] bg-white/45 p-8 text-center">
          <FileText className="h-10 w-10 text-primary" aria-hidden="true" />
          <p className="mt-3 font-heading text-lg font-bold text-text-main">Preview placeholder</p>
          <p className="mt-1 text-sm text-text-secondary">PDF and document rendering will connect in a later phase.</p>
        </div>
      )}
    </DetailModal>
  );
}
