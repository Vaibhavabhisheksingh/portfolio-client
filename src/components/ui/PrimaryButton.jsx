import { motion } from "framer-motion";

const PrimaryButton = ({
  children,
  icon: Icon,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        scale: disabled ? 1 : 1.03,
        y: disabled ? 0 : -2,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.97,
      }}
      className="
        inline-flex
        items-center
        gap-2
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-blue-500
        px-5
        py-3
        font-medium
        text-white
        shadow-lg
        shadow-blue-500/20
        transition
        hover:shadow-blue-500/40
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {Icon && <Icon size={18} />}

      {children}
    </motion.button>
  );
};

export default PrimaryButton;