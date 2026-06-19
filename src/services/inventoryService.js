import { mockInventory } from "@/data/mockInventory";
import { createResourceService } from "@/services/mockService";

export const inventoryService = createResourceService({
  endpoint: "/inventory/items/",
  mockData: mockInventory,
});
