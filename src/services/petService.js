import { mockPets } from "@/data/mockPets";
import { createResourceService } from "@/services/mockService";

export const petService = createResourceService({
  endpoint: "/pets/",
  mockData: mockPets,
});
