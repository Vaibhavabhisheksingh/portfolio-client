import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "react-hot-toast";

import contactService from "../../../services/contactService";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await contactService.sendMessage(form);

      toast.success("Message sent successfully.");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to send message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/60
        backdrop-blur-xl
        p-8
        space-y-6
      "
    >
      <input
        required
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full rounded-xl border border-zinc-700 bg-transparent px-5 py-4 text-white outline-none transition focus:border-blue-500"
      />

      <input
        required
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        className="w-full rounded-xl border border-zinc-700 bg-transparent px-5 py-4 text-white outline-none transition focus:border-blue-500"
      />

      <input
        required
        type="text"
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        className="w-full rounded-xl border border-zinc-700 bg-transparent px-5 py-4 text-white outline-none transition focus:border-blue-500"
      />

      <textarea
        required
        rows="6"
        name="message"
        placeholder="Write your message..."
        value={form.message}
        onChange={handleChange}
        className="w-full rounded-xl border border-zinc-700 bg-transparent px-5 py-4 text-white outline-none transition focus:border-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-blue-600
          px-8
          py-4
          text-white
          transition
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <Send size={18} />

        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;