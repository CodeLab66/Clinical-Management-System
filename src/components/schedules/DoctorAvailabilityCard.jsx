import { CalendarCheck2, DoorOpen, Stethoscope } from "lucide-react";
import { BranchBadge } from "@/components/badges/BranchBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { GlassCard } from "@/components/cards/GlassCard";

export function DoctorAvailabilityCard({ doctor }) {
  return (
    <GlassCard padding="compact" className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-heading text-base font-bold text-text-main">{doctor.name}</h3>
          <p className="mt-1 text-sm text-text-secondary">{doctor.specialization}</p>
        </div>
        <StatusBadge status={doctor.status} />
      </div>
      <BranchBadge branch={doctor.branch} />
      <div className="grid gap-2 text-sm text-text-secondary">
        <p className="flex items-center gap-2 rounded-[16px] bg-white/45 p-3 font-semibold">
          <CalendarCheck2 className="h-4 w-4 text-primary-dark" aria-hidden="true" />
          {doctor.todayShift}
        </p>
        <p className="flex items-center gap-2 rounded-[16px] bg-white/45 p-3 font-semibold">
          <DoorOpen className="h-4 w-4 text-primary-dark" aria-hidden="true" />
          {doctor.room}
        </p>
        <p className="flex items-center gap-2 rounded-[16px] bg-white/45 p-3 font-semibold">
          <Stethoscope className="h-4 w-4 text-primary-dark" aria-hidden="true" />
          {doctor.appointmentsBooked} booked / {doctor.availableSlots} slots
        </p>
      </div>
    </GlassCard>
  );
}
