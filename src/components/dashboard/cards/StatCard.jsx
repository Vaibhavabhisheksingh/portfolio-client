import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
}) => {
  const colors = {
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
    emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",
    violet: "from-violet-500/20 to-violet-600/5 border-violet-500/20",
    amber: "from-amber-500/20 to-amber-600/5 border-amber-500/20",
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        ${colors[color]}
        bg-gradient-to-br
        bg-zinc-900/60
        backdrop-blur-xl
        p-6
        shadow-xl
      `}
    >
      {/* Glow */}
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-zinc-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <Icon className="text-white" size={26} />
        </div>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between">
        <span className="text-sm text-zinc-400">
          Portfolio Overview
        </span>

        <ArrowUpRight
          className="text-zinc-500"
          size={18}
        />
      </div>
    </motion.div>
  );
};

export default StatCard;