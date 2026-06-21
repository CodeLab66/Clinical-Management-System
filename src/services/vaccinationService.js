import { mockVaccinationDeworming } from "@/data/mockVaccinationDeworming";
import { delay } from "@/services/mockService";

export const vaccinationService = {
  async getVaccinationRecords() {
    return delay(mockVaccinationDeworming);
  },

  async createVaccinationRecord(payload) {
    return delay({
      id: `vax-${Date.now()}`,
      type: "vaccine",
      status: "scheduled",
      reminderEnabled: Boolean(payload.reminderEnabled),
      ...payload,
    });
  },

  async createDewormingRecord(payload) {
    return delay({
      id: `dw-${Date.now()}`,
      type: "deworming",
      status: "scheduled",
      reminderEnabled: Boolean(payload.reminderEnabled),
      ...payload,
    });
  },

  async markVaccineGiven(id, payload) {
    return delay({ id, status: "completed", lastGiven: payload?.dateGiven || "Today", ...payload });
  },

  async scheduleVaccineReminder(id, payload) {
    return delay({ id, status: "scheduled", reminderEnabled: true, ...payload });
  },
};
