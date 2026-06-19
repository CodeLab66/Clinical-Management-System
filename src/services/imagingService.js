import { mockImagingOrders } from "@/data/mockImagingOrders";
import { createResourceService } from "@/services/mockService";

export const imagingService = createResourceService({
  endpoint: "/imaging-orders/",
  mockData: mockImagingOrders,
});
