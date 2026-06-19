import { WorkflowStep } from "@/components/common/WorkflowStep";

export function WorkflowStepper({ steps = [], current = 0 }) {
  return (
    <div
      className="grid gap-4 rounded-[24px] bg-white/45 p-4"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 10rem), 1fr))" }}
    >
      {steps.map((step, index) => (
        <WorkflowStep key={step.label} {...step} active={index === current} complete={index < current} />
      ))}
    </div>
  );
}
