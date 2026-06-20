import { mockAppointments } from "@/data/mockAppointments";
import { delay } from "@/services/mockService";

export const appointmentService = {
  async getAppointments() {
    return delay(mockAppointments);
  },

  async getAppointmentById(id) {
    return delay(mockAppointments.find((appointment) => appointment.id === id) || null);
  },

  async createAppointment(payload) {
    return delay({
      id: `apt-${Date.now()}`,
      status: "confirmed",
      paymentStatus: "unpaid",
      ...payload,
    });
  },

  async updateAppointment(id, payload) {
    return delay({ id, ...payload });
  },

  async rescheduleAppointment(id, payload) {
    return delay({
      id,
      date: payload.date,
      time: payload.time,
      rescheduleReason: payload.reason,
      status: "confirmed",
      notifyClient: payload.notifyClient,
    });
  },

  async cancelAppointment(id) {
    return delay({ id, status: "cancelled" });
  },

  async checkInAppointment(id) {
    return delay({ id, status: "checked_in" });
  },
};
