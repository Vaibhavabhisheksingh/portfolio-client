import { Code2, Brain, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

const cards = [
  {
    icon: Code2,
    title: "MERN Stack",
    description: "Building scalable full-stack applications.",
  },
  {
    icon: Brain,
    title: "Problem Solving",
    description: "Focused on DSA and clean coding practices.",
  },
  {
    icon: Briefcase,
    title: "Open To Work",
    description: "Looking for internships and exciting opportunities.",
  },
];

const AboutCards = () => {
  return (
    <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">

      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.15,
              duration: 0.5,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900/50
              backdrop-blur-md
              p-6
            "
          >
            <Icon
              size={34}
              className="text-blue-500 mb-4"
            />

            <h4 className="text-white font-semibold mb-2">
              {card.title}
            </h4>

            <p className="text-zinc-400 text-sm leading-6">
              {card.description}
            </p>

          </motion.div>
        );
      })}

    </div>
  );
};

export default memo(AboutCards);