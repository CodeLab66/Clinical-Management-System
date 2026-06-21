import { mockPrescriptions } from "@/data/mockPrescriptions";
import { delay } from "@/services/mockService";

export const prescriptionService = {
  async getPrescriptions() {
    return delay(mockPrescriptions);
  },

  async getPrescriptionById(id) {
    return delay(mockPrescriptions.find((prescription) => String(prescription.id) === String(id)) || null);
  },

  async createPrescription(payload) {
    return delay({
      id: `RX-${Math.floor(Math.random() * 9000) + 3000}`,
      status: "draft",
      pharmacyStatus: "not_sent",
      createdAt: "Just now",
      medicines: [],
      ...payload,
    });
  },

  async updatePrescription(id, payload) {
    return delay({ id, ...payload });
  },

  async sendToPharmacy(id) {
    return delay({ id, status: "sent_to_pharmacy", pharmacyStatus: "dispensing_pending" });
  },

  async cancelPrescription(id) {
    return delay({ id, status: "cancelled", pharmacyStatus: "cancelled" });
  },
};
