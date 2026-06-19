import { mockReports } from "@/data/mockReports";
import { createResourceService } from "@/services/mockService";

export const reportService = createResourceService({
  endpoint: "/reports/dashboard/",
  mockData: mockReports,
});
