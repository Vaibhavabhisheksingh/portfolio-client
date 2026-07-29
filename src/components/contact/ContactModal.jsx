import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Mail,
  User,
  MessageSquare,
  Globe,
  Monitor,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";

const ContactModal = ({
  open,
  message,
  onClose,
  onMarkRead,
}) => {
  if (!open || !message) return null;

  return (
    <AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          p-3
          sm:p-6
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={(e) => e.stopPropagation()}
          className="
            w-full
            max-w-4xl
            overflow-hidden
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900
            shadow-2xl
          "
        >

          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-zinc-800
              px-5
              py-4
              sm:px-8
            "
          >

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-white
                "
              >
                Contact Details
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                Complete message information
              </p>

            </div>

            <button
              onClick={onClose}
              className="
                rounded-xl
                bg-zinc-800
                p-2
                text-zinc-400
                transition
                hover:bg-zinc-700
                hover:text-white
              "
            >
              <X size={20} />
            </button>

          </div>

          {/* Body */}

          <div
            className="
              max-h-[70vh]
              overflow-y-auto
              p-5
              sm:p-8
            "
          >

            <div
              className="
                grid
                gap-6

                lg:grid-cols-2
              "
            >

              {/* Name */}

              <InfoCard
                icon={<User size={18} />}
                title="Name"
                value={message.name}
              />

              {/* Email */}

              <InfoCard
                icon={<Mail size={18} />}
                title="Email"
                value={message.email}
              />

              {/* Subject */}

              <InfoCard
                icon={<MessageSquare size={18} />}
                title="Subject"
                value={message.subject}
              />

              {/* Created */}

              <InfoCard
                icon={<Calendar size={18} />}
                title="Received"
                value={new Date(
                  message.createdAt
                ).toLocaleString()}
              />

              {/* Read */}

              <InfoCard
                icon={<CheckCircle2 size={18} />}
                title="Read Status"
                value={
                  message.isRead
                    ? "Read"
                    : "Unread"
                }
              />

              {/* Replied */}

              <InfoCard
                icon={<Clock size={18} />}
                title="Reply Status"
                value={
                  message.isReplied
                    ? "Replied"
                    : "Not Replied"
                }
              />

              {/* Replied At */}

              {message.repliedAt && (
                <InfoCard
                  icon={<Calendar size={18} />}
                  title="Replied At"
                  value={new Date(
                    message.repliedAt
                  ).toLocaleString()}
                />
              )}

              {/* IP */}

              <InfoCard
                icon={<Globe size={18} />}
                title="IP Address"
                value={
                  message.ipAddress ||
                  "Not Available"
                }
              />

            </div>

            {/* User Agent */}

            <div className="mt-8">

              <div
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-blue-400
                "
              >
                <Monitor size={18} />

                <span className="font-medium">
                  User Agent
                </span>

              </div>

              <div
                className="
                  rounded-2xl
                  bg-zinc-800/60
                  p-4
                  text-sm
                  leading-7
                  text-zinc-300
                  break-all
                "
              >
                {message.userAgent ||
                  "Not Available"}
              </div>

            </div>

            {/* Message */}

            <div className="mt-8">

              <div
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-blue-400
                "
              >
                <MessageSquare size={18} />

                <span className="font-medium">
                  Message
                </span>

              </div>

              <div
                className="
                  whitespace-pre-wrap
                  rounded-2xl
                  bg-zinc-800/60
                  p-5
                  leading-8
                  text-zinc-300
                "
              >
                {message.message}
              </div>

            </div>

          </div>

          {/* Footer */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              border-t
              border-zinc-800
              p-5

              sm:flex-row
              sm:justify-end
            "
          >

            <button
              onClick={onClose}
              className="
                rounded-xl
                bg-zinc-800
                px-6
                py-3
                text-white
                transition
                hover:bg-zinc-700
              "
            >
              Close
            </button>

            {!message.isRead && (

              <button
                onClick={onMarkRead}
                className="
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                Mark as Read
              </button>

            )}

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
};

const InfoCard = ({
  icon,
  title,
  value,
}) => (
  <div
    className="
      rounded-2xl
      border
      border-zinc-800
      bg-zinc-900/60
      p-4
    "
  >
    <div
      className="
        mb-2
        flex
        items-center
        gap-2
        text-blue-400
      "
    >
      {icon}

      <span className="font-medium">
        {title}
      </span>
    </div>

    <p
      className="
        break-words
        text-zinc-300
      "
    >
      {value}
    </p>
  </div>
);

export default ContactModal;