import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import contactService from "../../services/contactService";

import ContactHeader from "../../components/contact/ContactHeader";
import ContactTable from "../../components/contact/ContactTable";
import ContactModal from "../../components/contact/ContactModal";

import DeleteModal from "../../components/ui/DeleteModal";

const Contact = () => {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [selectedMessage, setSelectedMessage] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  // ===============================
  // Fetch Messages
  // ===============================

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await contactService.getMessages();

      setMessages(res.messages || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ===============================
  // Search + Filter
  // ===============================

  const filteredMessages = useMemo(() => {
    let data = [...messages];

    if (filter === "read") {
      data = data.filter((item) => item.isRead);
    }

    if (filter === "unread") {
      data = data.filter((item) => !item.isRead);
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter(
        (item) =>
          item.name?.toLowerCase().includes(keyword) ||
          item.email?.toLowerCase().includes(keyword) ||
          item.subject?.toLowerCase().includes(keyword),
      );
    }

    return data;
  }, [messages, search, filter]);

  // ===============================
  // View Message
  // ===============================

  const handleView = async (message) => {
    try {
      const res = await contactService.getMessage(message._id);

      setSelectedMessage(res.message);

      setModalOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load message.");
    }
  };

  // ===============================
  // Delete
  // ===============================

  const handleDelete = (message) => {
    setSelectedMessage(message);

    setDeleteOpen(true);
  };
  const confirmDelete = async () => {
    if (!selectedMessage) return;

    try {
      setDeleting(true);

      await contactService.deleteMessage(selectedMessage._id);

      toast.success("Message deleted successfully.");

      await fetchMessages();

      setDeleteOpen(false);

      setModalOpen(false);

      setSelectedMessage(null);
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete message.");
    } finally {
      setDeleting(false);
    }
  };

  // ===============================
  // Mark Read
  // ===============================

  const handleMarkRead = async (id) => {
    try {
      await contactService.markAsRead(id);

      toast.success("Marked as read.");

      fetchMessages();

      if (selectedMessage) {
        setSelectedMessage({
          ...selectedMessage,
          isRead: true,
        });
      }
    } catch (error) {
      console.error(error);

      toast.error("Operation failed.");
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        space-y-8
        p-4

        sm:p-6

        lg:p-8
      "
    >
      <ContactHeader
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        totalMessages={messages.length}
        unreadMessages={messages.filter((item) => !item.isRead).length}
      />

      <ContactTable
        loading={loading}
        messages={filteredMessages}
        onView={handleView}
        onDelete={handleDelete}
      />
      {/* ========================= */}
      {/* Empty State */}
      {/* ========================= */}

      {!loading && filteredMessages.length === 0 && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="
              flex
              min-h-[280px]
              flex-col
              items-center
              justify-center
              rounded-3xl
              border
              border-dashed
              border-zinc-700
              bg-zinc-900/40
              p-8
              text-center
            "
        >
          <div
            className="
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-zinc-800
                text-3xl
              "
          >
            📭
          </div>

          <h2
            className="
                text-xl
                font-semibold
                text-white
              "
          >
            No Messages Found
          </h2>

          <p
            className="
                mt-3
                max-w-md
                text-zinc-400
              "
          >
            There are no contact messages matching your search or filter.
          </p>
        </motion.div>
      )}

      {/* ========================= */}
      {/* View Modal */}
      {/* ========================= */}

      <ContactModal
        open={modalOpen}
        message={selectedMessage}
        onClose={() => {
          setModalOpen(false);

          setSelectedMessage(null);
        }}
        onMarkRead={() => {
          if (selectedMessage && !selectedMessage.isRead) {
            handleMarkRead(selectedMessage._id);
          }
        }}
      />
      <DeleteModal
        open={deleteOpen}
        loading={deleting}
        title="Delete Message"
        message={
          selectedMessage
            ? `Are you sure you want to permanently delete the message from "${selectedMessage.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this message?"
        }
        onClose={() => {
          if (deleting) return;

          setDeleteOpen(false);
          setSelectedMessage(null);
        }}
        onConfirm={confirmDelete}
      />
    </motion.div>
  );
};

export default Contact;
