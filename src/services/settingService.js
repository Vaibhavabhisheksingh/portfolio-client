import api from "../api/axios";

const getSettings = async () => {
  const { data } = await api.get("/settings");
  return data.settings;
};

const updateSettings = async (formData) => {
  const { data } = await api.put(
    "/settings",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export default {
  getSettings,
  updateSettings,
};