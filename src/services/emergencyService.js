import { mockEmergencyCases } from "@/data/mockEmergencyCases";
import { createResourceService } from "@/services/mockService";

export const emergencyService = createResourceService({
  endpoint: "/emergency-cases/",
  mockData: mockEmergencyCases,
});
