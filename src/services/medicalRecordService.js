import { mockMedicalRecords } from "@/data/mockMedicalRecords";
import { delay } from "@/services/mockService";

export const medicalRecordService = {
  async getMedicalRecords() {
    return delay(mockMedicalRecords);
  },

  async getMedicalRecordByPetId(petId) {
    return delay(mockMedicalRecords.find((record) => String(record.petId) === String(petId)) || null);
  },

  async getMedicalRecordById(id) {
    return delay(mockMedicalRecords.find((record) => String(record.id) === String(id)) || null);
  },

  async addMedicalNote(payload) {
    return delay({ id: `note-${Date.now()}`, createdAt: "Just now", ...payload });
  },

  async updateMedicalAlert(id, payload) {
    return delay({ id, ...payload });
  },
};
