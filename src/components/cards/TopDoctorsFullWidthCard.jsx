import { GlassCard } from "@/components/cards/GlassCard";
import { cn } from "@/lib/utils";

const statusStyles = {
  active: {
    label: "Active",
    badge: "bg-success/12 text-success",
  },
  reviewing_labs: {
    label: "Reviewing labs",
    badge: "bg-warning/15 text-[#8a5a17]",
  },
  pending: {
    label: "Pending",
    badge: "bg-warning/15 text-[#8a5a17]",
  },
};

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function DoctorMetricPill({ label, value }) {
  return (
    <div className="min-w-0 rounded-[16px] bg-white/50 px-2.5 py-2 xl:px-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-text-muted">
        {label}
      </p>
      <p className="mt-1 break-words text-[13px] font-bold text-text-main xl:text-sm">{value}</p>
    </div>
  );
}

export function TopDoctorsFullWidthCard({ doctors = [], className }) {
  return (
    <GlassCard className={cn("space-y-3.5 xl:space-y-4", className)}>
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="font-heading text-base font-bold text-text-main xl:text-lg">
            Top Doctors Today
          </h3>
          <p className="mt-1 text-xs leading-5 text-text-secondary xl:text-sm">
            Consultation load, revenue, and clinical activity by doctor.
          </p>
        </div>
        <span className="self-start whitespace-nowrap rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-text-muted">
          Today
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {doctors.map((doctor) => {
          const status = statusStyles[doctor.status] || statusStyles.pending;

          return (
            <div
              key={doctor.id}
              className="min-w-0 rounded-[20px] border border-white/60 bg-white/45 p-3.5 xl:rounded-[22px] xl:p-4"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-sm font-extrabold text-primary-dark">
                  {doctor.rank}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-text-main text-xs font-bold text-white">
                  {initials(doctor.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <p className="break-words font-bold text-text-main">{doctor.name}</p>
                    <span className={cn("whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold leading-none", status.badge)}>
                      {status.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-text-secondary xl:text-sm">
                    {doctor.branch} - {doctor.role}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <DoctorMetricPill label="Consultations" value={doctor.consultations} />
                <DoctorMetricPill label="Revenue" value={doctor.revenue} />
                <DoctorMetricPill label="Avg. time" value={doctor.average_time} />
                <DoctorMetricPill label="Emergencies" value={doctor.emergency_cases} />
                <DoctorMetricPill label="Lab reviews" value={doctor.lab_reviews} />
                <DoctorMetricPill label="Branch" value={doctor.branch} />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
