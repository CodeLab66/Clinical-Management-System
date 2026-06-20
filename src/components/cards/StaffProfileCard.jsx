import { Mail, Phone, ShieldCheck } from "lucide-react";
import { BranchBadge } from "@/components/badges/BranchBadge";
import { RoleBadge } from "@/components/badges/RoleBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { GlassCard } from "@/components/cards/GlassCard";

function MiniList({ title, items = [] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">{title}</p>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <p key={item} className="rounded-[16px] bg-white/45 px-3 py-2 text-sm font-semibold text-text-secondary">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export function StaffProfileCard({ staff }) {
  if (!staff) return null;

  return (
    <GlassCard className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] bg-primary text-xl font-black text-white shadow-soft">
          {staff.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-xl font-bold text-text-main">{staff.name}</h3>
          <p className="mt-1 text-sm font-semibold text-text-muted">{staff.staffId}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <RoleBadge role={staff.role} />
            <BranchBadge branch={staff.branch} />
            <StatusBadge status={staff.accountStatus} />
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <p className="flex items-center gap-2 rounded-[18px] bg-white/45 p-3 text-sm font-semibold text-text-secondary">
          <Phone className="h-4 w-4 text-primary-dark" aria-hidden="true" />
          {staff.phone}
        </p>
        <p className="flex min-w-0 items-center gap-2 rounded-[18px] bg-white/45 p-3 text-sm font-semibold text-text-secondary">
          <Mail className="h-4 w-4 shrink-0 text-primary-dark" aria-hidden="true" />
          <span className="truncate">{staff.email}</span>
        </p>
      </div>

      <div className="rounded-[20px] bg-white/35 p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-text-main">
          <ShieldCheck className="h-4 w-4 text-primary-dark" aria-hidden="true" />
          Performance Summary
        </p>
        <p className="mt-2 text-sm leading-6 text-text-secondary">{staff.performance}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <MiniList title="Assigned services" items={staff.assignedServices} />
        <MiniList title="Upcoming shifts" items={staff.upcomingShifts} />
        <MiniList title="Recent activity" items={staff.recentActivity} />
      </div>
    </GlassCard>
  );
}
