import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({
  open,
  onClose,
  title,
  children,
  size = "lg",
}) => {
  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={(e) => e.stopPropagation()}
          className={`
            relative
            w-full
            ${sizes[size]}
            overflow-hidden
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900
            shadow-2xl
          `}
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">

            <h2 className="text-2xl font-bold text-white">
              {title}
            </h2>

            <button
              onClick={onClose}
              className="
                rounded-xl
                p-2
                text-zinc-500
                transition
                hover:bg-zinc-800
                hover:text-white
              "
            >
              <X size={22} />
            </button>

          </div>

          {/* Body */}

          <div className="max-h-[75vh] overflow-y-auto p-8">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;