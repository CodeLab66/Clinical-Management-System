import apiClient from "@/services/apiClient";
import { delay, useMocks } from "@/services/mockService";
import { mockUsers } from "@/data/mockUsers";

export const authService = {
  async login(credentials) {
    if (useMocks) {
      return delay({
        access: "mock_access_token",
        refresh: "mock_refresh_token",
        user: mockUsers[0],
        credentials,
      });
    }

    const response = await apiClient.post("/auth/login/", credentials);
    return response.data;
  },

  async me() {
    if (useMocks) return delay(mockUsers[0]);
    const response = await apiClient.get("/auth/me/");
    return response.data;
  },

  async logout() {
    if (useMocks) return delay({ success: true });
    const response = await apiClient.post("/auth/logout/");
    return response.data;
  },
};
