import { Menu, Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const titles = {
  "/admin": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/skills": "Skills",
  "/admin/experience": "Experience",
  "/admin/education": "Education",
  "/admin/certificates": "Certificates",
  "/admin/messages": "Messages",
  "/admin/settings": "Settings",
};

const Topbar = ({ toggleSidebar }) => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 backdrop-blur-xl">

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-white">
            {titles[location.pathname] || "Dashboard"}
          </h1>

          <p className="text-sm text-zinc-500">
            Manage your portfolio
          </p>
        </div>

      </div>

      <div className="flex items-center gap-4">

        <div className="hidden items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 md:flex">
          <Search size={18} className="text-zinc-500" />

          <input
            placeholder="Search..."
            className="bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-zinc-400 transition hover:text-white"
        >
          <Bell size={18} />
        </motion.button>

      </div>

    </header>
  );
};

export default Topbar;