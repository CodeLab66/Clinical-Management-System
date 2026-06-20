import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, CircleX, ClipboardCheck, Clock3, Download, Plus, UserX } from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { AppointmentTimelineCard } from "@/components/cards/AppointmentTimelineCard";
import { GlassCard } from "@/components/cards/GlassCard";
import { StatCard } from "@/components/cards/StatCard";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { AddAppointmentModal } from "@/components/modals/AddAppointmentModal";
import { FormModal } from "@/components/modals/FormModal";
import { RescheduleAppointmentModal } from "@/components/modals/RescheduleAppointmentModal";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppointmentTable } from "@/components/tables/AppointmentTable";
import { ActionButton } from "@/components/ui/ActionButton";
import { appointmentKpis } from "@/data/mockAppointments";
import { appointmentService } from "@/services/appointmentService";

const iconMap = { CalendarDays, CheckCircle2, CircleX, ClipboardCheck, Clock3, UserX };

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("day");
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rescheduling, setRescheduling] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    appointmentService.getAppointments().then((data) => {
      setAppointments(data);
      setLoading(false);
    });
  }, []);

  const sortedAppointments = useMemo(() => [...appointments].sort((a, b) => a.time.localeCompare(b.time)), [appointments]);

  const createAppointment = async (payload) => {
    const created = await appointmentService.createAppointment({
      ...payload,
      duration: Number(payload.duration),
      status: "confirmed",
      paymentStatus: "unpaid",
    });
    setAppointments((current) => [created, ...current]);
    setNotice(`${created.petName} appointment added.`);
    setModalOpen(false);
  };

  const checkIn = async (appointment) => {
    const updated = await appointmentService.checkInAppointment(appointment.id);
    setAppointments((current) => current.map((item) => item.id === appointment.id ? { ...item, ...updated } : item));
    setNotice(`${appointment.petName} checked in.`);
  };

  const cancel = async (appointment) => {
    const updated = await appointmentService.cancelAppointment(appointment.id);
    setAppointments((current) => current.map((item) => item.id === appointment.id ? { ...item, ...updated } : item));
    setNotice(`${appointment.petName} appointment cancelled.`);
  };

  const reschedule = async (payload) => {
    const updated = await appointmentService.rescheduleAppointment(rescheduling.id, payload);
    setAppointments((current) => current.map((item) => item.id === rescheduling.id ? { ...item, ...updated } : item));
    setNotice(`${rescheduling.petName} moved to ${payload.date} at ${payload.time}.`);
    setRescheduling(null);
  };

  if (loading) {
    return <PageContainer className="space-y-4"><LoadingSkeleton className="min-h-[116px]" /><LoadingSkeleton variant="table" /></PageContainer>;
  }

  return (
    <PageContainer className="space-y-5">
      <PageHeader
        title="Appointments"
        subtitle="Schedule, confirm, reschedule, and manage clinic appointments."
        actions={<><ActionButton icon={Plus} onClick={() => setModalOpen(true)}>Add Appointment</ActionButton><ActionButton icon={CalendarDays} variant="ghost" onClick={() => setView("day")}>Calendar View</ActionButton><ActionButton icon={Download} variant="ghost">Export</ActionButton></>}
      />
      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {appointmentKpis.map((item) => {
          const Icon = iconMap[item.icon] || CalendarDays;
          return <StatCard key={item.label} {...item} icon={Icon} />;
        })}
      </div>

      <GlassCard className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-bold text-text-main">Today Schedule</h2>
            <p className="mt-1 text-sm text-text-secondary">Switch between day, week, and compact list views.</p>
          </div>
          <div className="flex rounded-full bg-white/55 p-1">
            {[
              ["day", "Day View"],
              ["week", "Week View"],
              ["list", "List View"],
            ].map(([key, label]) => (
              <button key={key} type="button" className={`rounded-full px-3 py-2 text-xs font-bold transition ${view === key ? "bg-primary text-white shadow-soft" : "text-text-secondary hover:bg-white/70"}`} onClick={() => setView(key)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {view === "list" ? (
          <AppointmentTable appointments={sortedAppointments} onView={setSelected} onCheckIn={checkIn} onReschedule={setRescheduling} onCancel={cancel} />
        ) : (
          <div className="grid gap-3 md:grid-cols-1 min-[900px]:grid-cols-2 xl:grid-cols-3">
            {sortedAppointments.map((appointment) => <AppointmentTimelineCard key={appointment.id} appointment={appointment} onClick={setSelected} />)}
          </div>
        )}
      </GlassCard>

      <GlassCard className="space-y-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-text-main">Appointment Table</h2>
          <p className="mt-1 text-sm text-text-secondary">Reception-friendly table for actions, payment state, and reminders.</p>
        </div>
        {appointments.length ? <AppointmentTable appointments={sortedAppointments} onView={setSelected} onCheckIn={checkIn} onReschedule={setRescheduling} onCancel={cancel} /> : <EmptyState title="No appointments found" />}
      </GlassCard>

      <FormModal open={Boolean(selected)} title="Appointment Detail" subtitle={selected ? `${selected.petName} - ${selected.ownerName}` : ""} onClose={() => setSelected(null)}>
        {selected ? (
          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-[20px] bg-white/45 p-4"><h3 className="font-heading text-sm font-bold text-text-main">Booking</h3><p className="mt-3 text-sm text-text-secondary">{selected.date} at {selected.time}</p><p className="text-sm text-text-secondary">{selected.duration} minutes</p><p className="mt-2"><StatusBadge status={selected.status} /></p></section>
            <section className="rounded-[20px] bg-white/45 p-4"><h3 className="font-heading text-sm font-bold text-text-main">Care Team</h3><p className="mt-3 text-sm text-text-secondary">{selected.doctor}</p><p className="text-sm text-text-secondary">{selected.branch}</p></section>
            <section className="rounded-[20px] bg-white/45 p-4 md:col-span-2"><h3 className="font-heading text-sm font-bold text-text-main">Reason</h3><p className="mt-3 text-sm leading-6 text-text-secondary">{selected.symptoms}</p><p className="mt-2 text-sm leading-6 text-text-secondary">{selected.notes}</p></section>
          </div>
        ) : null}
      </FormModal>

      <AddAppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={createAppointment} />
      <RescheduleAppointmentModal open={Boolean(rescheduling)} appointment={rescheduling} onClose={() => setRescheduling(null)} onSubmit={reschedule} />
    </PageContainer>
  );
}
