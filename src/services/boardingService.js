import { mockBoarding } from "@/data/mockBoarding";
import { createResourceService } from "@/services/mockService";

export const boardingService = createResourceService({
  endpoint: "/boarding/bookings/",
  mockData: mockBoarding,
});
