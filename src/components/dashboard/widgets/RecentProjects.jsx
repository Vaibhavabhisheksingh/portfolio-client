import { motion } from "framer-motion";
import { FolderKanban, ArrowRight } from "lucide-react";

const RecentProjects = ({ projects = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/60
        p-6
        backdrop-blur-xl
      "
    >
      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <FolderKanban
            className="text-blue-500"
            size={24}
          />

          <h2 className="text-xl font-semibold text-white">
            Recent Projects
          </h2>

        </div>

        <ArrowRight
          className="text-zinc-500"
          size={18}
        />

      </div>

      <div className="space-y-4">

        {projects.length === 0 ? (

          <p className="text-zinc-500">
            No projects available.
          </p>

        ) : (

          projects.map((project) => (

            <motion.div
              whileHover={{
                x: 6,
              }}
              key={project._id}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-950/50
                p-4
                transition
                hover:border-blue-500/30
              "
            >
              <div>

                <h3 className="font-semibold text-white">
                  {project.title}
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  {project.category || "Project"}
                </p>

              </div>

              <span className="text-xs text-zinc-600">
                New
              </span>

            </motion.div>

          ))

        )}

      </div>

    </motion.div>
  );
};

export default RecentProjects;