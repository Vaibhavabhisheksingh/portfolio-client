import api from "../api/axios";

const dashboardService = {
  getStats: async () => {
    const { data } = await api.get("/dashboard/stats");
    return data;
  },

  getRecentProjects: async () => {
    const { data } = await api.get("/dashboard/recent-projects");
    return data;
  },

  getRecentMessages: async () => {
    const { data } = await api.get("/dashboard/recent-messages");
    return data;
  },
};

export default dashboardService;