import api from "../api/axios";

const getCertificates = async () => {
  const { data } = await api.get("/certificates");
  return data;
};

const getCertificate = async (id) => {
  const { data } = await api.get(`/certificates/${id}`);
  return data;
};

const createCertificate = async (formData) => {
  const { data } = await api.post(
    "/certificates",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

const updateCertificate = async (
  id,
  formData
) => {
  const { data } = await api.put(
    `/certificates/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

const deleteCertificate = async (id) => {
  const { data } = await api.delete(
    `/certificates/${id}`
  );

  return data;
};
 
export default {
  getCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};