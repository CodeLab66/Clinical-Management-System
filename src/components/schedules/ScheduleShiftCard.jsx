import { cn } from "@/lib/utils";

const statusClasses = {
  Available: "border-success/20 bg-success/10 text-success",
  Booked: "border-info/20 bg-info/10 text-info",
  Limited: "border-warning/30 bg-warning/15 text-[#8a5a17]",
  Unavailable: "border-danger/20 bg-danger/10 text-danger",
};

export function ScheduleShiftCard({ shift }) {
  if (!shift) return null;

  return (
    <div className={cn("rounded-[16px] border p-2.5 text-xs shadow-sm", statusClasses[shift.status] || "border-white/70 bg-white/60 text-text-secondary")}>
      <p className="font-black text-text-main">{shift.displayTime}</p>
      <p className="mt-1 font-semibold">{shift.branch}</p>
      <p className="mt-0.5 text-text-secondary">{shift.room}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-white/65 px-2 py-0.5 font-bold">{shift.serviceType}</span>
        <span className="rounded-full bg-white/65 px-2 py-0.5 font-bold">{shift.status}</span>
      </div>
    </div>
  );
}
