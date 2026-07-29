import { motion } from "framer-motion";

import {
  FaPython,
  FaJava,
  FaAws,
} from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  SiRedux,
  SiTypescript,
  SiDocker,
  SiHtml5,
  SiCss,
  SiMySQL,
 
} from "react-icons/si";
import { memo } from "react";

const icons = {
  react: SiReact,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  git: SiGit,
  github: SiGithub,
  postman: SiPostman,
  redux: SiRedux,
  typescript: SiTypescript,
  docker: SiDocker,
  html: SiHtml5,
  css: SiCss,
  mysql: SiMySQL,
  java: FaJava,
  python: FaPython,
  aws: FaAws,
};

const SkillCard = ({ skill, index }) => {
  //const Icon = icons[skill.icon];
  const Icon = icons[skill.icon?.toLowerCase()];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className="
        group
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/60
        backdrop-blur-md
        p-6
        transition-all
        duration-300
        hover:border-blue-500
        hover:shadow-xl
        hover:shadow-blue-500/10
      "
    >
      {/* <Icon
        size={45}
        className="text-blue-500 mb-5 transition-transform duration-300 group-hover:scale-110"
      /> */}
      {Icon && (
        <Icon
          size={45}
          className="mb-5 text-blue-500 transition-transform duration-300 group-hover:scale-110"
        />
      )}
      <h3 className="text-xl font-semibold text-white">{skill.name}</h3>

      {/* <p className="text-zinc-400 mt-2">
        {skill.level}
      </p> */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-zinc-400">Proficiency</span>

          <span className="text-sm font-semibold text-blue-400">
            {skill.proficiency}%
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-700"
            style={{
              width: `${skill.proficiency}%`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default memo(SkillCard);
