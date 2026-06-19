import { QueueCard } from "@/components/common/QueueCard";

export function KanbanColumn({ title, subtitle, items = [], renderActions }) {
  return (
    <section className="min-h-[260px] rounded-[24px] border border-white/60 bg-white/35 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-base font-bold text-text-main">{title}</h3>
          {subtitle ? <p className="mt-1 text-xs text-text-muted">{subtitle}</p> : null}
        </div>
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-text-secondary">{items.length}</span>
      </div>
      <div className="space-y-3">
        {items.map((item) => <QueueCard key={item.id} item={item} actions={renderActions?.(item)} />)}
      </div>
    </section>
  );
}
