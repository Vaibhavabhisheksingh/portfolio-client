import { motion } from "framer-motion";
import {
  Eye,
  Trash2,
  Mail,
  MailOpen,
} from "lucide-react";

const ContactRow = ({
  message,
  mobile = false,
  onView,
  onDelete,
}) => {

  const formattedDate = new Date(
    message.createdAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  /* ===============================
      Mobile Card
  =============================== */

  if (mobile) {
    return (
      <motion.div
        whileHover={{
          y: -3,
        }}
        className="
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900/40
          p-5
        "
      >
        <div className="flex items-start gap-4">

          {/* Avatar */}

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-600/20
              text-lg
              font-bold
              text-blue-400
            "
          >
            {message.name?.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex items-center justify-between gap-3">

              <h3
                className="
                  truncate
                  font-semibold
                  text-white
                "
              >
                {message.name}
              </h3>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium

                  ${
                    message.isRead
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }
                `}
              >
                {message.isRead
                  ? "Read"
                  : "Unread"}
              </span>

            </div>

            <p className="mt-2 break-all text-sm text-zinc-400">
              {message.email}
            </p>

            <p className="mt-3 font-medium text-white">
              {message.subject}
            </p>

            <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
              {message.message}
            </p>

            <p className="mt-4 text-xs text-zinc-500">
              {formattedDate}
            </p>

            <div className="mt-5 flex gap-3">

              <button
                type="button"
                onClick={() => onView(message)}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600/20
                  px-4
                  py-2
                  text-blue-400
                  transition
                  hover:bg-blue-600/40
                "
              >
                <Eye size={16} />
                View
              </button>

              <button
                type="button"
                onClick={() => onDelete(message)}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-red-600/20
                  px-4
                  py-2
                  text-red-400
                  transition
                  hover:bg-red-600/40
                "
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>

        </div>

      </motion.div>
    );
  }

  /* ===============================
      Desktop Row
  =============================== */

  return (
    <motion.div
      layout
      whileHover={{
        backgroundColor:
          "rgba(39,39,42,0.45)",
      }}
      className="
        grid
        grid-cols-12
        items-center
        gap-4
        border-b
        border-zinc-800
        px-6
        py-5
        transition
      "
    >

      {/* Name */}

      <div className="col-span-2 flex items-center gap-3">

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-blue-600/20
            font-semibold
            text-blue-400
          "
        >
          {message.name?.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">

          <h3 className="truncate font-semibold text-white">
            {message.name}
          </h3>

          <p className="text-xs text-zinc-500">
            {formattedDate}
          </p>

        </div>

      </div>

      {/* Email */}

      <div className="col-span-3 truncate text-zinc-300">
        {message.email}
      </div>

      {/* Subject */}

      <div className="col-span-3 truncate font-medium text-white">
        {message.subject}
      </div>

      {/* Status */}

      <div className="col-span-2">
        <span
          className={`
            inline-flex
            items-center
            gap-2
            rounded-full
            px-3
            py-1
            text-xs
            font-medium

            ${
              message.isRead
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-yellow-500/20 text-yellow-400"
            }
          `}
        >
          {message.isRead ? (
            <MailOpen size={14} />
          ) : (
            <Mail size={14} />
          )}

          {message.isRead
            ? "Read"
            : "Unread"}
        </span>
      </div>

      {/* Actions */}

      <div className="col-span-2 flex justify-end gap-2">

        <button
          type="button"
          onClick={() => onView(message)}
          className="
            rounded-xl
            bg-blue-600/20
            p-2
            text-blue-400
            transition
            hover:bg-blue-600/40
          "
        >
          <Eye size={18} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(message)}
          className="
            rounded-xl
            bg-red-600/20
            p-2
            text-red-400
            transition
            hover:bg-red-600/40
          "
        >
          <Trash2 size={18} />
        </button>

      </div>

    </motion.div>
  );
};

export default ContactRow;