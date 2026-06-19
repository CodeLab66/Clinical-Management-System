import { mockConsentForms } from "@/data/mockConsentForms";
import { createResourceService } from "@/services/mockService";

export const consentService = createResourceService({
  endpoint: "/consent-forms/",
  mockData: mockConsentForms,
});
