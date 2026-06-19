import { mockPrescriptions } from "@/data/mockPrescriptions";
import { createResourceService } from "@/services/mockService";

export const prescriptionService = createResourceService({
  endpoint: "/prescriptions/",
  mockData: mockPrescriptions,
});
