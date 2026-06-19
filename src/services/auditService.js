import { mockAuditLogs } from "@/data/mockAuditLogs";
import { createResourceService } from "@/services/mockService";

export const auditService = createResourceService({
  endpoint: "/audit-logs/",
  mockData: mockAuditLogs,
});
