import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Sidebar from "../components/dashboard/sidebar/Sidebar";
import Topbar from "../components/dashboard/topbar/Topbar";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-950">

      {/* Desktop Sidebar */}

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}

      <AnimatePresence>

        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />

            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 z-50 lg:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}

      </AnimatePresence>

      {/* Main */}

      <div className="flex flex-1 flex-col">

        <Topbar
          toggleSidebar={() => setOpen(!open)}
        />

        <main className="flex-1 overflow-y-auto p-8">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <Outlet />
            
          </motion.div>

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;