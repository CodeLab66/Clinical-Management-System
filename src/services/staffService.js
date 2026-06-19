import { mockStaff } from "@/data/mockStaff";
import { createResourceService } from "@/services/mockService";

export const staffService = createResourceService({
  endpoint: "/staff/",
  mockData: mockStaff,
});
