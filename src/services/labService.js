import { mockLabOrders } from "@/data/mockLabOrders";
import { createResourceService } from "@/services/mockService";

export const labService = createResourceService({
  endpoint: "/lab-orders/",
  mockData: mockLabOrders,
});
