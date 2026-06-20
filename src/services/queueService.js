import { mockQueue } from "@/data/mockQueue";
import { delay } from "@/services/mockService";

const stageStatusMap = {
  checked_in: "checked_in",
  waiting: "waiting",
  consultation: "in_consultation",
  lab: "lab_pending",
  pharmacy: "pharmacy_pending",
  billing: "billing_pending",
  completed: "completed",
};

export const queueService = {
  async getQueueItems() {
    return delay(mockQueue);
  },

  async addToQueue(payload) {
    return delay({
      id: `queue-${Date.now()}`,
      queueNo: `Q-${Math.floor(Math.random() * 80) + 40}`,
      stage: "checked_in",
      status: "checked_in",
      priority: payload.severity === "Critical" ? "critical" : payload.severity === "High" ? "urgent" : "normal",
      waitTime: "0m",
      alerts: [payload.emergencyReason].filter(Boolean),
      paymentStatus: "unpaid",
      ...payload,
    });
  },

  async updateQueueStage(id, stage) {
    return delay({ id, stage, status: stageStatusMap[stage] || stage });
  },

  async markEmergency(id) {
    return delay({ id, priority: "critical", severity: "Critical" });
  },

  async completeQueueItem(id) {
    return delay({ id, stage: "completed", status: "completed" });
  },

  async removeFromQueue(id) {
    return delay({ id, removed: true });
  },
};
