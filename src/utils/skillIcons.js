import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";

import {
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiFirebase,
  SiSupabase,
  SiNetlify,
  SiGithub,
  SiFigma,
} from "react-icons/si";

export const skillIcons = {
  react: FaReact,
  nodejs: FaNodeJs,
  express: SiExpress,
  mongodb: SiMongodb,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  docker: FaDocker,
  aws: FaAws,
  java: FaJava,
  python: FaPython,
  git: FaGitAlt,
  github: SiGithub,
  redux: SiRedux,
  firebase: SiFirebase,
  supabase: SiSupabase,
  netlify: SiNetlify,
  vercel: SiVercel,
  html: FaHtml5,
  css: FaCss3Alt,
  figma: SiFigma,
};

export const skillIconList = Object.entries(skillIcons).map(
  ([name, icon]) => ({
    name,
    icon,
  })
);