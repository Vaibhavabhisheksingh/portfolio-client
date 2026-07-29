import { Inbox } from "lucide-react";
import { motion } from "framer-motion";

const EmptyState = ({
  title = "No Data Found",
  description = "There is nothing to display.",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-zinc-800
        bg-zinc-900/40
        py-20
        text-center
      "
    >
      <div className="rounded-full bg-zinc-800 p-5">
        <Inbox
          size={40}
          className="text-zinc-500"
        />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-sm text-zinc-500">
        {description}
      </p>
    </motion.div>
  );
};

export default EmptyState;