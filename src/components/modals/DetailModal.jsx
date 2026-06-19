import { X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

export function DetailModal({ open, title, subtitle, children, footer, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-main/30 p-4 backdrop-blur-sm">
      <section className="glass-card max-h-[90vh] w-full max-w-3xl overflow-hidden p-0" role="dialog" aria-modal="true" aria-labelledby="detail-modal-title">
        <header className="flex items-start justify-between gap-4 border-b border-white/60 p-6">
          <div>
            <h2 id="detail-modal-title" className="font-heading text-xl font-bold text-text-main">{title}</h2>
            {subtitle ? <p className="mt-1 text-sm text-text-secondary">{subtitle}</p> : null}
          </div>
          <IconButton icon={X} label="Close modal" onClick={onClose} />
        </header>
        <div className="max-h-[60vh] overflow-y-auto p-6">{children}</div>
        {footer ? <footer className="border-t border-white/60 p-6">{footer}</footer> : null}
      </section>
    </div>
  );
}
