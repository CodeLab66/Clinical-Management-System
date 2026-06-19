import { mockQueue } from "@/data/mockQueue";
import { createResourceService } from "@/services/mockService";

export const queueService = createResourceService({
  endpoint: "/queue/",
  mockData: mockQueue,
});
