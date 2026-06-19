import { PawPrint } from "lucide-react";
import { GlassCard } from "@/components/cards/GlassCard";

export function PetAvatarCard({ pet, children }) {
  return (
    <GlassCard className="text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-[30px] bg-primary-soft text-primary-dark">
        {pet?.photo_url ? <img src={pet.photo_url} alt="" className="h-full w-full object-cover" /> : <PawPrint className="h-10 w-10" aria-hidden="true" />}
      </div>
      <h3 className="mt-4 font-heading text-xl font-bold text-text-main">{pet?.name}</h3>
      <p className="mt-1 text-sm text-text-secondary">{pet?.species} · {pet?.breed}</p>
      {children ? <div className="mt-4 flex flex-wrap justify-center gap-2">{children}</div> : null}
    </GlassCard>
  );
}
