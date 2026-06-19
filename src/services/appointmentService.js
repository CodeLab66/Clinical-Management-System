import apiClient from "@/services/apiClient";
import { createResourceService, delay, useMocks } from "@/services/mockService";
import {
  mockAppointmentRequests,
  mockAppointments,
} from "@/data/mockAppointments";

const appointmentResource = createResourceService({
  endpoint: "/appointments/",
  mockData: mockAppointments,
});

export const appointmentService = {
  ...appointmentResource,

  async listRequests(params) {
    if (useMocks) return delay(mockAppointmentRequests);
    const response = await apiClient.get("/appointment-requests/", { params });
    return response.data;
  },

  async getRequestById(id) {
    if (useMocks) {
      return delay(
        mockAppointmentRequests.find((record) => String(record.id) === String(id)) ||
          null,
      );
    }
    const response = await apiClient.get(`/appointment-requests/${id}/`);
    return response.data;
  },
};
