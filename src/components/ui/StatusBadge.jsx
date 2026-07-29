import { CheckCircle2, Clock3, Star, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const variants = {
  active: {
    icon: CheckCircle2,
    classes:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    label: "Active",
  },

  inactive: {
    icon: XCircle,
    classes:
      "bg-red-500/10 text-red-400 border-red-500/20",
    label: "Inactive",
  },

  featured: {
    icon: Star,
    classes:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",
    label: "Featured",
  },

  draft: {
    icon: Clock3,
    classes:
      "bg-zinc-700/30 text-zinc-300 border-zinc-700",
    label: "Draft",
  },

  read: {
    icon: CheckCircle2,
    classes:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",
    label: "Read",
  },

  unread: {
    icon: Clock3,
    classes:
      "bg-violet-500/10 text-violet-400 border-violet-500/20",
    label: "Unread",
  },
};

const StatusBadge = ({
  status = "active",
}) => {
  const current =
    variants[status] || variants.active;

  const Icon = current.icon;

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-medium
        ${current.classes}
      `}
    >
      <Icon size={14} />

      {current.label}
    </motion.div>
  );
};

export default StatusBadge;