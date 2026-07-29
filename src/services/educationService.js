import api from "../api/axios";

const educationService = {
  getEducations: async () => {
    const res = await api.get("/educations");
    return res.data;
  },

  getEducation: async (id) => {
    const res = await api.get(`/educations/${id}`);
    return res.data;
  },

  createEducation: async (data) => {
    const res = await api.post(
      "/educations",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  },

  updateEducation: async (
    id,
    data
  ) => {
    const res = await api.put(
      `/educations/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  },

  deleteEducation: async (id) => {
    const res = await api.delete(
      `/educations/${id}`
    );

    return res.data;
  },
};

export default educationService;