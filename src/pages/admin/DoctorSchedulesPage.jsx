import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarCheck2,
  CalendarClock,
  CalendarX2,
  DoorOpen,
  Download,
  Plus,
  Siren,
  Stethoscope,
} from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { DoctorAvailabilityCard } from "@/components/schedules/DoctorAvailabilityCard";
import { WeeklyScheduleGrid } from "@/components/schedules/WeeklyScheduleGrid";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { CheckboxInput } from "@/components/forms/CheckboxInput";
import { DateInput } from "@/components/forms/DateInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { TimeInput } from "@/components/forms/TimeInput";
import { FormModal } from "@/components/modals/FormModal";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ActionButton } from "@/components/ui/ActionButton";
import {
  leaveRequests,
  scheduleDays,
  scheduleDoctors,
  scheduleKpis,
  scheduleStatuses,
  unavailableDoctors,
} from "@/data/mockSchedules";
import { scheduleService } from "@/services/scheduleService";

const iconMap = { AlertTriangle, CalendarCheck2, CalendarX2, DoorOpen, Siren, Stethoscope };

const initialForm = {
  doctor: "Dr. Ahmed Khan",
  branch: "DHA Branch",
  room: "Room 2",
  date: "2026-06-22",
  day: "Monday",
  startTime: "09:00",
  endTime: "14:00",
  serviceType: "Consultation",
  repeatWeekly: true,
  maxAppointments: "12",
  emergencyCoverage: false,
  notes: "",
  status: "Available",
};

const displayTime = (start, end) => `${start} - ${end}`;

export default function DoctorSchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    scheduleService.getDoctorSchedules().then((data) => {
      setSchedules(data);
      setLoading(false);
    });
  }, []);

  const doctorOptions = useMemo(
    () => scheduleDoctors.map((doctor) => ({ label: doctor.name, value: doctor.name })),
    [],
  );

  const branchOptions = useMemo(
    () => Array.from(new Set(scheduleDoctors.map((doctor) => doctor.branch))).map((branch) => ({ label: branch, value: branch })),
    [],
  );

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submitForm = async (event) => {
    event.preventDefault();
    const doctor = scheduleDoctors.find((item) => item.name === form.doctor);
    const created = await scheduleService.createSchedule({
      ...form,
      doctorId: doctor?.id || `doc-${Date.now()}`,
      displayTime: displayTime(form.startTime, form.endTime),
      maxAppointments: Number(form.maxAppointments),
    });
    setSchedules((current) => [created, ...current]);
    setNotice(`${form.doctor} schedule added locally.`);
    setModalOpen(false);
  };

  if (loading) {
    return (
      <PageContainer className="space-y-4">
        <LoadingSkeleton className="min-h-[116px]" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {scheduleKpis.map((item) => <LoadingSkeleton key={item.label} />)}
        </div>
        <LoadingSkeleton variant="table" />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-5">
      <PageHeader
        title="Doctor Schedules"
        subtitle="Plan doctor shifts, consultation hours, rooms, and branch availability."
        actions={(
          <>
            <ActionButton icon={Plus} onClick={() => setModalOpen(true)}>Add Schedule</ActionButton>
            <ActionButton icon={CalendarClock} variant="ghost">Weekly View</ActionButton>
            <ActionButton icon={Download} variant="ghost">Export</ActionButton>
          </>
        )}
      />

      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {scheduleKpis.map((item) => {
          const Icon = iconMap[item.icon] || CalendarClock;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Weekly Schedule Grid</h2>
          <p className="mt-1 text-sm text-text-secondary">Doctors as rows, days as columns, shifts inside each day.</p>
        </div>
        <WeeklyScheduleGrid doctors={scheduleDoctors} days={scheduleDays} schedules={schedules} />
      </GlassCard>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-text-main">Doctor Availability</h2>
            <p className="mt-1 text-sm text-text-secondary">Today&apos;s branch assignment, room, appointments, and slots.</p>
          </div>
          {scheduleDoctors.length ? (
            <div className="grid gap-3 md:grid-cols-1 min-[900px]:grid-cols-2 2xl:grid-cols-3">
              {scheduleDoctors.map((doctor) => <DoctorAvailabilityCard key={doctor.id} doctor={doctor} />)}
            </div>
          ) : (
            <EmptyState title="No schedules found" description="Doctor availability will appear here once schedules exist." />
          )}
        </div>

        <GlassCard className="space-y-5">
          <div>
            <h2 className="font-heading text-lg font-bold text-text-main">Leave & Unavailable</h2>
            <p className="mt-1 text-sm text-text-secondary">Pending leave requests, unavailable doctors, and coverage warnings.</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">Pending leave requests</p>
            {leaveRequests.map((request) => (
              <div key={request.id} className="rounded-[18px] bg-white/45 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-text-main">{request.doctor}</p>
                    <p className="mt-1 text-sm text-text-secondary">{request.branch} · {request.date}</p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
                <p className="mt-2 text-sm text-text-muted">{request.reason}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">Coverage warnings</p>
            {unavailableDoctors.map((item) => (
              <div key={item.id} className="rounded-[18px] border border-warning/20 bg-warning/10 p-3">
                <p className="font-bold text-text-main">{item.doctor}</p>
                <p className="mt-1 text-sm font-semibold text-text-secondary">Coverage: {item.coverage}</p>
                <p className="mt-2 text-sm text-[#8a5a17]">{item.warning}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <FormModal
        open={modalOpen}
        title="Add Schedule"
        subtitle="UI-only schedule setup. Backend persistence will be connected later."
        onClose={() => setModalOpen(false)}
        footer={(
          <div className="flex flex-wrap justify-end gap-2">
            <ActionButton variant="ghost" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
            <ActionButton type="submit" form="schedule-form">Create Schedule</ActionButton>
          </div>
        )}
      >
        <form id="schedule-form" className="grid gap-4 md:grid-cols-2" onSubmit={submitForm}>
          <SelectInput label="Doctor" value={form.doctor} onChange={(event) => updateField("doctor", event.target.value)} options={doctorOptions} />
          <SelectInput label="Branch" value={form.branch} onChange={(event) => updateField("branch", event.target.value)} options={branchOptions} />
          <TextInput label="Room" value={form.room} onChange={(event) => updateField("room", event.target.value)} />
          <DateInput label="Date" value={form.date} onChange={(event) => updateField("date", event.target.value)} />
          <SelectInput label="Day" value={form.day} onChange={(event) => updateField("day", event.target.value)} options={scheduleDays.map((day) => ({ label: day, value: day }))} />
          <TimeInput label="Start Time" value={form.startTime} onChange={(event) => updateField("startTime", event.target.value)} />
          <TimeInput label="End Time" value={form.endTime} onChange={(event) => updateField("endTime", event.target.value)} />
          <TextInput label="Service Type" value={form.serviceType} onChange={(event) => updateField("serviceType", event.target.value)} />
          <TextInput label="Max Appointments" type="number" value={form.maxAppointments} onChange={(event) => updateField("maxAppointments", event.target.value)} />
          <SelectInput label="Status" value={form.status} onChange={(event) => updateField("status", event.target.value)} options={scheduleStatuses.map((status) => ({ label: status, value: status }))} />
          <CheckboxInput label="Repeat Weekly" checked={form.repeatWeekly} onChange={(event) => updateField("repeatWeekly", event.target.checked)} />
          <CheckboxInput label="Emergency Coverage" checked={form.emergencyCoverage} onChange={(event) => updateField("emergencyCoverage", event.target.checked)} />
          <TextAreaInput label="Notes" value={form.notes} onChange={(event) => updateField("notes", event.target.value)} />
        </form>
      </FormModal>
    </PageContainer>
  );
}
