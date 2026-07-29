import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { memo } from "react";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md"
    >
      {/* Project Image */}
      <div className="h-64 overflow-hidden bg-zinc-800">
        {project.images?.length > 0 ? (
          <img
            src={project.images[0].url}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-500">
            No Image
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="flex flex-wrap gap-3">
          {project.featured && (
            <span className="rounded-full bg-blue-600 px-4 py-1 text-sm text-white">
              Featured
            </span>
          )}

          <span className="rounded-full border border-zinc-700 px-4 py-1 text-sm text-zinc-300">
            {project.category}
          </span>

          <span className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-sm text-green-400">
            {project.status}
          </span>
        </div>

        <h3 className="mt-5 text-3xl font-bold text-white">{project.title}</h3>

        <p className="mt-4 leading-7 text-zinc-400">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack?.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-white transition hover:border-blue-500"
            >
              <FaGithub size={18} />
              GitHub
            </a>
          )}

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ProjectCard);
