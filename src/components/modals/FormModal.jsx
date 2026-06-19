import { DetailModal } from "@/components/modals/DetailModal";

export function FormModal({ open, title, subtitle, children, footer, onClose }) {
  return (
    <DetailModal open={open} title={title} subtitle={subtitle} footer={footer} onClose={onClose}>
      {children}
    </DetailModal>
  );
}
