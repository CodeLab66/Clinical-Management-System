import { mockVaccinations } from "@/data/mockVaccinations";
import { createResourceService } from "@/services/mockService";

export const vaccinationService = createResourceService({
  endpoint: "/vaccination-records/",
  mockData: mockVaccinations,
});
