import { mockPets } from "@/data/mockPets";
import { delay } from "@/services/mockService";

export const petService = {
  async getPets() {
    return delay(mockPets);
  },

  async getPetById(id) {
    return delay(mockPets.find((pet) => pet.id === id) || null);
  },

  async createPet(payload) {
    return delay({
      id: `pet-${Date.now()}`,
      petId: `PET-${Date.now().toString().slice(-4)}`,
      vaccineStatus: "Unknown",
      dewormingStatus: "Unknown",
      lastVisit: "No visits yet",
      upcomingAppointment: "None",
      timeline: ["Pet profile created locally"],
      ...payload,
    });
  },

  async updatePet(id, payload) {
    return delay({ id, ...payload });
  },

  async addMedicalAlert(id, payload) {
    return delay({ id, medicalAlert: payload.medicalAlert, alertNote: payload.note });
  },

  async archivePet(id) {
    return delay({ id, archived: true });
  },
};
