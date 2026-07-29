import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

const TableActions = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-3">

      <motion.button
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.9,
        }}
        onClick={onEdit}
        className="
          rounded-xl
          border
          border-blue-500/20
          bg-blue-500/10
          p-2.5
          text-blue-400
          transition
          hover:bg-blue-500/20
        "
      >
        <Pencil size={16} />
      </motion.button>

      <motion.button
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.9,
        }}
        onClick={onDelete}
        className="
          rounded-xl
          border
          border-red-500/20
          bg-red-500/10
          p-2.5
          text-red-400
          transition
          hover:bg-red-500/20
        "
      >
        <Trash2 size={16} />
      </motion.button>

    </div>
  );
};

export default TableActions;