import { mockFollowUps } from "@/data/mockFollowUps";
import { delay } from "@/services/mockService";

export const followUpService = {
  async getFollowUps() {
    return delay(mockFollowUps);
  },

  async createFollowUp(payload) {
    return delay({ id: `fu-${Date.now()}`, status: "scheduled", ...payload });
  },

  async updateFollowUp(id, payload) {
    return delay({ id, ...payload });
  },

  async markFollowUpCompleted(id) {
    return delay({ id, status: "completed" });
  },

  async rescheduleFollowUp(id, payload) {
    return delay({ id, status: "scheduled", ...payload });
  },
};
