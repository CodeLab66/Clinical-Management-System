import { ClipboardList, Database, Route, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";

export function PlaceholderPage({
  title,
  section = "Internal Module",
  description = "This route is reserved for a future VetOS Pro workflow.",
}) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={section} title={title} description={description} />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Route"
          value="Ready"
          hint="React Router foundation"
          icon={Route}
          tone="primary"
        />
        <StatCard
          label="Data"
          value="Mock"
          hint="Service layer prepared"
          icon={Database}
          tone="info"
        />
        <StatCard
          label="Backend"
          value="DRF"
          hint="API-compatible contracts"
          icon={ShieldCheck}
          tone="success"
        />
      </div>

      <GlassCard>
        <EmptyState
          icon={ClipboardList}
          title={`${title} placeholder`}
          description="Full feature UI, forms, tables, workflow states, and API behavior will be added in later phases."
        />
      </GlassCard>
    </div>
  );
}
