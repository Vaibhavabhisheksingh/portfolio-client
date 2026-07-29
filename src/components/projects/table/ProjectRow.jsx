import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import StatusBadge from "../../ui/StatusBadge";
import TableActions from "../../ui/TableActions";

const ProjectRow = ({
  project,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      whileHover={{
        backgroundColor: "rgba(255,255,255,0.03)",
      }}
      className="
        grid
        grid-cols-1
        gap-6
        border-b
        border-zinc-800
        p-6
        transition-all
        lg:grid-cols-12
        lg:items-center
      "
    >
      {/* Image */}

      <div className="lg:col-span-2">
        <img
          src={
            project.images?.[0]?.url ||
            "https://placehold.co/300x200/18181b/ffffff?text=Project"
          }
          alt={project.title}
          className="
            h-20
            w-full
            rounded-2xl
            object-cover
            lg:w-32
          "
        />
      </div>

      {/* Title */}

      <div className="space-y-2 lg:col-span-3">

        <div className="flex items-center gap-2">

          <h3 className="font-semibold text-white">
            {project.title}
          </h3>

          {project.featured && (
            <Star
              size={15}
              className="fill-yellow-400 text-yellow-400"
            />
          )}

        </div>

        <p className="line-clamp-2 text-sm text-zinc-400">
          {project.description}
        </p>

      </div>

      {/* Tech Stack */}

      <div className="flex flex-wrap gap-2 lg:col-span-3">

        {project.techStack?.map((tech) => (
          <span
            key={tech}
            className="
              rounded-full
              border
              border-blue-500/20
              bg-blue-500/10
              px-3
              py-1
              text-xs
              text-blue-400
            "
          >
            {tech}
          </span>
        ))}

      </div>

      {/* Status */}

      <div className="lg:col-span-2">

        <StatusBadge
          status={
            project.featured
              ? "featured"
              : project.status || "active"
          }
        />

      </div>

      {/* Actions */}

      <div className="flex items-center justify-between lg:col-span-2 lg:justify-end lg:gap-4">

        <div className="flex gap-3">

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 transition hover:text-white"
            >
              <FaGithub size={18} />
            </a>
          )}

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 transition hover:text-white"
            >
              <ExternalLink size={18} />
            </a>
          )}

        </div>

        <TableActions
          onEdit={() => onEdit(project)}
          onDelete={() => onDelete(project)}
        />

      </div>

    </motion.div>
  );
};

export default ProjectRow;