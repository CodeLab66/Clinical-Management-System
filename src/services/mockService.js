import apiClient from "@/services/apiClient";

export const useMocks = import.meta.env.VITE_USE_MOCKS !== "false";

export const delay = (data, time = 250) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(data), time);
  });

export function createResourceService({ endpoint, mockData = [] }) {
  return {
    async list(params) {
      if (useMocks) return delay(mockData);
      const response = await apiClient.get(endpoint, { params });
      return response.data;
    },

    async getById(id) {
      if (useMocks) {
        return delay(mockData.find((record) => String(record.id) === String(id)) || null);
      }
      const response = await apiClient.get(`${endpoint}${id}/`);
      return response.data;
    },

    async create(payload) {
      if (useMocks) return delay({ id: Date.now(), ...payload });
      const response = await apiClient.post(endpoint, payload);
      return response.data;
    },

    async update(id, payload) {
      if (useMocks) return delay({ id, ...payload });
      const response = await apiClient.patch(`${endpoint}${id}/`, payload);
      return response.data;
    },
  };
}
