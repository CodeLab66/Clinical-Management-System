import { mockAppointmentRequests } from "@/data/mockAppointmentRequests";
import { delay } from "@/services/mockService";

export const appointmentRequestService = {
  async getAppointmentRequests() {
    return delay(mockAppointmentRequests);
  },

  async getAppointmentRequestById(id) {
    return delay(mockAppointmentRequests.find((request) => request.id === id) || null);
  },

  async createAppointmentRequest(payload) {
    return delay({
      id: `req-${Date.now()}`,
      status: "new",
      createdAt: new Date().toISOString(),
      createdLabel: "Just now",
      timeline: ["Request created by reception"],
      conflictWarnings: [],
      ...payload,
    });
  },

  async updateAppointmentRequest(id, payload) {
    return delay({ id, ...payload });
  },

  async confirmAppointmentRequest(id, payload) {
    return delay({
      id,
      status: "confirmed",
      confirmedAt: new Date().toISOString(),
      confirmation: payload,
    });
  },

  async cancelAppointmentRequest(id) {
    return delay({ id, status: "cancelled" });
  },
};
