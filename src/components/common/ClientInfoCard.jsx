import { Phone, User } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";

export function ClientInfoCard({ client }) {
  return (
    <GlassCard>
      <h3 className="font-heading text-lg font-bold text-text-main">Client</h3>
      <div className="mt-4 space-y-3 text-sm text-text-secondary">
        <p className="flex items-center gap-2"><User className="h-4 w-4" aria-hidden="true" />{client?.name}</p>
        <p className="flex items-center gap-2"><Phone className="h-4 w-4" aria-hidden="true" />{client?.phone}</p>
      </div>
    </GlassCard>
  );
}
