import { mockDeworming } from "@/data/mockDeworming";
import { createResourceService } from "@/services/mockService";

export const dewormingService = createResourceService({
  endpoint: "/deworming-records/",
  mockData: mockDeworming,
});
