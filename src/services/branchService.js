import { mockBranches } from "@/data/mockBranches";
import { createResourceService } from "@/services/mockService";

export const branchService = createResourceService({
  endpoint: "/branches/",
  mockData: mockBranches,
});
