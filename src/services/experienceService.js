import api from "../api/axios";

const experienceService = {
  getExperiences: async () => {
    const res = await api.get("/experiences");
    return res.data;
  },

  getExperience: async (id) => {
    const res = await api.get(`/experiences/${id}`);
    return res.data;
  },

  createExperience: async (data) => {
    const res = await api.post(
      "/experiences",
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return res.data;
  },

  updateExperience: async (
    id,
    data
  ) => {
    const res = await api.put(
      `/experiences/${id}`,
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return res.data;
  },

  deleteExperience: async (id) => {
    const res = await api.delete(
      `/experiences/${id}`
    );

    return res.data;
  },
};

export default experienceService;