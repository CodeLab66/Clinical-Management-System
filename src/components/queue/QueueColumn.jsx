import { QueuePatientCard } from "@/components/cards/QueuePatientCard";

export function QueueColumn({ title, subtitle, items = [], onMove, onEmergency, onRemove }) {
  return (
    <section className="queue-stage-row rounded-[22px] border border-white/60 bg-white/35 p-4">
      <div className="queue-stage-header">
        <div className="min-w-0">
          <h3 className="font-heading text-base font-bold text-text-main">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-text-secondary">{subtitle}</p> : null}
        </div>
        <span className="section-count-badge">{items.length} {items.length === 1 ? "patient" : "patients"}</span>
      </div>
      <div className="queue-stage-scroll">
        <div className="queue-stage-cards">
          {items.length ? items.map((item) => (
            <QueuePatientCard key={item.id} item={item} onMove={onMove} onEmergency={onEmergency} onRemove={onRemove} />
          )) : (
            <div className="queue-empty-card">
              No patients in this stage.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
