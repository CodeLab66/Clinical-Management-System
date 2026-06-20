import { StatusBadge } from "@/components/badges/StatusBadge";

const Section = ({ title, items = [] }) => (
  <section className="rounded-[20px] bg-white/45 p-4">
    <h3 className="font-heading text-sm font-bold text-text-main">{title}</h3>
    <div className="mt-3 space-y-2">
      {items.length ? items.map((item) => <p key={item} className="text-sm leading-6 text-text-secondary">{item}</p>) : <p className="text-sm text-text-muted">No records yet.</p>}
    </div>
  </section>
);

export function ClientProfileCard({ client }) {
  if (!client) return null;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3 rounded-[20px] bg-white/45 p-4">
        <div>
          <p className="font-heading text-xl font-bold text-text-main">{client.name}</p>
          <p className="mt-1 text-sm font-semibold text-text-muted">{client.clientId} - {client.phone}</p>
          <p className="mt-1 text-sm text-text-secondary">{client.email}</p>
        </div>
        <StatusBadge status={client.status} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Section title="Client Details" items={[client.address, client.city, `Preferred branch: ${client.preferredBranch}`, `Emergency: ${client.emergencyContact}`]} />
        <Section title="Pets Owned" items={client.pets} />
        <Section title="Visit History" items={client.visitHistory} />
        <Section title="Pending Payments" items={client.payments} />
        <Section title="Communication History" items={client.communications} />
        <Section title="Upcoming Appointments" items={client.upcomingAppointments} />
      </div>
      <Section title="Notes" items={[client.notes]} />
    </div>
  );
}
