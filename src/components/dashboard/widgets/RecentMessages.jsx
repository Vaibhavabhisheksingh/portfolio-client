import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

const RecentMessages = ({ messages = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/60
        p-6
        backdrop-blur-xl
      "
    >
      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Mail
            className="text-emerald-500"
            size={24}
          />

          <h2 className="text-xl font-semibold text-white">
            Recent Messages
          </h2>

        </div>

        <ArrowRight
          className="text-zinc-500"
          size={18}
        />

      </div>

      <div className="space-y-4">

        {messages.length === 0 ? (

          <p className="text-zinc-500">
            No messages found.
          </p>

        ) : (

          messages.map((message) => (

            <motion.div
              whileHover={{
                x: 6,
              }}
              key={message._id}
              className="
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-950/50
                p-4
                transition
                hover:border-emerald-500/30
              "
            >
              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-white">
                  {message.name}
                </h3>

                {!message.isRead && (
                  <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
                    New
                  </span>
                )}

              </div>

              <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                {message.message}
              </p>

              <p className="mt-3 text-xs text-zinc-600">
                {new Date(message.createdAt).toLocaleDateString()}
              </p>

            </motion.div>

          ))

        )}

      </div>

    </motion.div>
  );
};

export default RecentMessages;