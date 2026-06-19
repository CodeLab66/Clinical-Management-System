import { BranchBadge } from "@/components/badges/BranchBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { PetAvatarCard } from "@/components/common/PetAvatarCard";

export function PetSummaryCard({ pet }) {
  return (
    <PetAvatarCard pet={pet}>
      <BranchBadge branch={pet?.branch_name} />
      <StatusBadge status={pet?.vaccination_status} />
    </PetAvatarCard>
  );
}
