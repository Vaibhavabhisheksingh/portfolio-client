import api from "../api/axios";

const contactService = {
  // Public Contact Form
  sendMessage: async (data) => {
    const response = await api.post("/contact", data);
    return response.data;
  },

  // Admin
  getMessages: async () => {
    const response = await api.get("/contact");
    return response.data;
  },
 
  getMessage: async (id) => {
    const response = await api.get(`/contact/${id}`);
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/contact/${id}/read`);
    return response.data;
  },

  deleteMessage: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },
};

export default contactService;