import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarItem = ({ icon: Icon, label, to }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <motion.div
          whileHover={{
            x: 6,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className={`
            group
            flex
            items-center
            gap-4
            rounded-2xl
            px-4
            py-3
            transition-all
            duration-300

            ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }
          `}
        >
          <Icon size={20} />

          <span className="font-medium">
            {label}
          </span>
        </motion.div>
      )}
    </NavLink>
  );
};

export default SidebarItem;