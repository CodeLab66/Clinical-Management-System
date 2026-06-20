import {
  Bed,
  Building2,
  Clock,
  FlaskConical,
  MapPin,
  Phone,
  Pill,
  ShieldAlert,
  Star,
  Stethoscope,
  Wallet,
} from "lucide-react";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { GlassCard } from "@/components/cards/GlassCard";
import { cn } from "@/lib/utils";

const money = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-1.5 rounded-[18px] border border-white/70 bg-primary-soft/35 px-2.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-dark" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted">{label}</p>
        <p className="mt-0.5 break-words text-sm font-semibold leading-5 text-text-main">{value}</p>
      </div>
    </div>
  );
}

export function BranchCard({ branch, className }) {
  return (
    <GlassCard className={cn("flex h-full flex-col gap-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-lg font-bold text-text-main">{branch.name}</h3>
            <span className="rounded-full bg-white/65 px-2.5 py-1 text-[11px] font-bold text-text-muted">
              {branch.code}
            </span>
          </div>
          <p className="mt-2 flex items-start gap-2 text-sm leading-5 text-text-secondary">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
            <span>{branch.address}</span>
          </p>
        </div>
        <StatusBadge status={branch.operatingStatus} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 min-[900px]:grid-cols-1 2xl:grid-cols-2">
        <Detail icon={Phone} label="Phone" value={branch.phone} />
        <Detail icon={Building2} label="Manager" value={branch.manager} />
        <Detail icon={Clock} label="Hours" value={`${branch.openingTime} - ${branch.closingTime}`} />
        <Detail icon={Stethoscope} label="Doctors" value={`${branch.doctorsOnDuty} on duty`} />
        <Detail icon={Bed} label="Rooms" value={`${branch.availableRooms} available / ${branch.totalRooms}`} />
        <Detail icon={Wallet} label="Revenue" value={money.format(branch.todayRevenue)} />
      </div>

      <div className="mt-auto grid gap-2 rounded-[20px] bg-white/35 p-3 text-sm text-text-secondary">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={branch.pharmacyStatus === "offline" ? "inactive" : branch.pharmacyStatus} className="normal-case" />
          <span className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-bold">
            <Pill className="h-3.5 w-3.5" aria-hidden="true" />
            Pharmacy {branch.pharmacyStatus}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-bold">
            <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
            Lab {branch.labStatus}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold", branch.emergencyAvailable ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
            <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
            {branch.emergencyAvailable ? "Emergency available" : "No emergency"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-bold text-text-secondary">
            <Star className="h-3.5 w-3.5 text-warning" aria-hidden="true" />
            {branch.rating} / {branch.healthScore} health
          </span>
        </div>
        <p className="text-xs font-semibold text-text-muted">
          {branch.todayAppointments} appointments today
        </p>
      </div>
    </GlassCard>
  );
}
