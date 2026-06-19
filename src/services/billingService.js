import { mockBills } from "@/data/mockBills";
import { createResourceService } from "@/services/mockService";

export const billingService = createResourceService({
  endpoint: "/billing/summaries/",
  mockData: mockBills,
});
