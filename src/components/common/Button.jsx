import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
}) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20",

    secondary:
      "border border-zinc-700 bg-zinc-900 hover:border-blue-500 text-white",

    outline:
      "border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;