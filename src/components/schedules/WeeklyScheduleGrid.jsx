import { EmptyState } from "@/components/empty-states/EmptyState";
import { ScheduleShiftCard } from "@/components/schedules/ScheduleShiftCard";

export function WeeklyScheduleGrid({ doctors = [], days = [], schedules = [] }) {
  if (!schedules.length) {
    return <EmptyState title="No schedules found" description="Add doctor availability to populate the weekly view." />;
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/60 bg-white/45">
      <div className="overflow-x-auto">
        <div className="min-w-[980px]">
          <div className="grid grid-cols-[180px_repeat(7,minmax(112px,1fr))] bg-white/55 text-[11px] font-black uppercase tracking-[0.12em] text-text-muted">
            <div className="px-4 py-4">Doctor</div>
            {days.map((day) => (
              <div key={day} className="border-l border-white/60 px-3 py-4 text-center">{day}</div>
            ))}
          </div>
          {doctors.map((doctor) => (
            <div key={doctor.id} className="grid grid-cols-[180px_repeat(7,minmax(112px,1fr))] border-t border-white/60">
              <div className="bg-white/30 px-4 py-3">
                <p className="font-bold text-text-main">{doctor.name}</p>
                <p className="mt-1 text-xs text-text-muted">{doctor.specialization}</p>
              </div>
              {days.map((day) => {
                const dayShifts = schedules.filter((shift) => shift.doctorId === doctor.id && shift.day === day);
                return (
                  <div key={`${doctor.id}-${day}`} className="min-h-[116px] border-l border-white/60 p-2">
                    <div className="space-y-2">
                      {dayShifts.map((shift) => <ScheduleShiftCard key={shift.id} shift={shift} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
