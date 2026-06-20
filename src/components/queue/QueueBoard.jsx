import { queueStages } from "@/data/mockQueue";
import { QueueColumn } from "@/components/queue/QueueColumn";

const stageDescriptions = {
  checked_in: "Patients checked in at reception.",
  waiting: "Patients waiting for their next care step.",
  consultation: "Pets currently with doctors.",
  lab: "Diagnostics and lab work in progress.",
  pharmacy: "Medication and pharmacy handoff pending.",
  billing: "Visits ready for payment collection.",
  completed: "Visits completed today.",
};

export function QueueBoard({ items = [], onMove, onEmergency, onRemove }) {
  return (
    <div className="live-patient-flow">
      {queueStages.map((stage) => (
        <QueueColumn
          key={stage.key}
          title={stage.label}
          subtitle={stageDescriptions[stage.key]}
          items={items.filter((item) => item.stage === stage.key)}
          onMove={onMove}
          onEmergency={onEmergency}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
