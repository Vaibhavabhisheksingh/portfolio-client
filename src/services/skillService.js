import api from "../api/axios";

const skillService = {
  getSkills: async () => {
    const response = await api.get("/skills");
    return response.data;
  },

  getSkill: async (id) => {
    const response = await api.get(`/skills/${id}`);
    return response.data;
  },

  createSkill: async (data) => {
    const response = await api.post("/skills", data);
    return response.data;
  },

  updateSkill: async (id, data) => {
    const response = await api.put(`/skills/${id}`, data);
    return response.data;
  },

  deleteSkill: async (id) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
  }, 
};

export default skillService;