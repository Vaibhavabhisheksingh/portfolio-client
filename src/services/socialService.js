import api from "../api/axios";

const getSocials = async () => {
  const { data } = await api.get("/socials");
  return data;
};

const getSocial = async (id) => {
  const { data } = await api.get(`/socials/${id}`);
  return data;
};

const createSocial = async (socialData) => {
  const { data } = await api.post(
    "/socials",
    socialData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

const updateSocial = async (id, socialData) => {
  const { data } = await api.put(
    `/socials/${id}`,
    socialData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

const deleteSocial = async (id) => {
  const { data } = await api.delete(`/socials/${id}`);
  return data;
};

const socialService = {
  getSocials,
  getSocial,
  createSocial,
  updateSocial,
  deleteSocial,
};

export default socialService;