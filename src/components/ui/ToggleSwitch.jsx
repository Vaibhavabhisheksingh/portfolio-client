import { motion } from "framer-motion";

const ToggleSwitch = ({
  checked = false,
  onChange,
  label,
}) => {
  return (
    <div className="flex items-center justify-between">

      {label && (
        <label className="text-sm font-medium text-zinc-300">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`
          relative
          h-8
          w-16
          rounded-full
          transition-all
          duration-300
          ${
            checked
              ? "bg-blue-600"
              : "bg-zinc-700"
          }
        `}
      >
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={`
            absolute
            top-1
            h-6
            w-6
            rounded-full
            bg-white
            shadow-lg
            ${
              checked
                ? "left-9"
                : "left-1"
            }
          `}
        />
      </button>

    </div>
  );
};

export default ToggleSwitch;