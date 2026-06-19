import { mockVisits } from "@/data/mockVisits";
import { createResourceService } from "@/services/mockService";

export const consultationService = createResourceService({
  endpoint: "/visits/",
  mockData: mockVisits,
});
