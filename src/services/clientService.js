import { mockClients } from "@/data/mockClients";
import { createResourceService } from "@/services/mockService";

export const clientService = createResourceService({
  endpoint: "/clients/",
  mockData: mockClients,
});
