import { mockPrescriptions } from "@/data/mockPrescriptions";
import { createResourceService } from "@/services/mockService";

export const pharmacyService = createResourceService({
  endpoint: "/pharmacy/queue/",
  mockData: mockPrescriptions,
});
