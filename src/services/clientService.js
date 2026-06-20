import { mockClients } from "@/data/mockClients";
import { delay } from "@/services/mockService";

export const clientService = {
  async getClients() {
    return delay(mockClients);
  },

  async getClientById(id) {
    return delay(mockClients.find((client) => client.id === id) || null);
  },

  async createClient(payload) {
    return delay({
      id: `client-${Date.now()}`,
      clientId: `CL-${Date.now().toString().slice(-4)}`,
      pets: [],
      petsCount: 0,
      lastVisit: "No visits yet",
      pendingBalance: 0,
      followUpDue: false,
      visitHistory: [],
      payments: ["No pending balance"],
      communications: ["Client created locally"],
      upcomingAppointments: [],
      ...payload,
    });
  },

  async updateClient(id, payload) {
    return delay({ id, ...payload });
  },

  async archiveClient(id) {
    return delay({ id, status: "inactive" });
  },
};
