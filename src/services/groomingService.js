import { mockGrooming } from "@/data/mockGrooming";
import { createResourceService } from "@/services/mockService";

export const groomingService = createResourceService({
  endpoint: "/grooming/appointments/",
  mockData: mockGrooming,
});
