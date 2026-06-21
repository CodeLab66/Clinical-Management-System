import { mockConsultations } from "@/data/mockConsultations";
import { delay } from "@/services/mockService";

export const consultationService = {
  async getConsultations() {
    return delay(mockConsultations);
  },

  async getConsultationById(id) {
    return delay(mockConsultations.find((consultation) => String(consultation.id) === String(id)) || mockConsultations[0]);
  },

  async startConsultation(id) {
    return delay({ id, status: "in_consultation", startedAt: "Now", lastUpdated: "Just now" });
  },

  async updateSOAPNote(id, payload) {
    return delay({ id, soap: payload, status: "soap_in_progress", lastUpdated: "Just now" });
  },

  async updateVitals(id, payload) {
    return delay({ id, vitals: payload, lastUpdated: "Just now" });
  },

  async completeConsultation(id, payload) {
    return delay({ id, status: "completed", completedAt: "Now", ...payload });
  },

  async requestLab(id, payload) {
    return delay({ id, status: "lab_requested", labRequest: payload, lastUpdated: "Just now" });
  },

  async createFollowUp(id, payload) {
    return delay({ id: `fu-${Date.now()}`, consultationId: id, status: "scheduled", ...payload });
  },
};
