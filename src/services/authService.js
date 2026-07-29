import api from "../api/axios";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);

    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );
    }

    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");
  },

  getCurrentAdmin: () => {
    const admin = localStorage.getItem("admin");
    return admin ? JSON.parse(admin) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("accessToken");
  },
};

export default authService;