import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { memo } from "react";

const JourneyCard = ({ item, index }) => {

  const isEducation = item.type === "education";

  const Icon = isEducation
    ? GraduationCap
    : Briefcase;

  const title = isEducation
    ? item.degree
    : item.jobTitle;

  const organization = isEducation
    ? item.institution
    : item.company;

  const badges = isEducation
    ? [item.fieldOfStudy]
    : item.technologies || [];

  const grade = isEducation
    ? [item.grade]
    : "" || [];

  const start = new Date(item.startDate).getFullYear();

  const end = isEducation
    ? item.currentlyStudying
      ? "Present"
      : item.endDate
      ? new Date(item.endDate).getFullYear()
      : ""
    : item.currentlyWorking
    ? "Present"
    : item.endDate
    ? new Date(item.endDate).getFullYear()
    : "";

  return (
    <div
      className={`relative flex items-center ${
        index % 2 === 0
          ? "lg:justify-start"
          : "lg:justify-end"
      }`}
    >

      <div
        className="
          absolute
          left-4
          top-10
          z-20
          h-5
          w-5
          rounded-full
          border-4
          border-zinc-950
          bg-blue-500
          lg:left-1/2
          lg:-translate-x-1/2
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          x: index % 2 === 0 ? -60 : 60,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{
          y: -8,
        }}
        className="
          ml-14
          w-full
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900/60
          backdrop-blur-xl
          p-8
          hover:border-blue-500
          lg:ml-0
          lg:w-[44%]
        "
      >

        <div className="flex items-center gap-4">

          <Icon
            size={34}
            className="text-blue-500"
          />

          <div>

            <p className="font-semibold text-blue-400">
              {start} - {end}
            </p>

            <h2 className="text-2xl font-bold text-white">
              {title}
            </h2>

          </div>

        </div>

        <p className="mt-3 text-zinc-500">
          {organization}
        </p>
         <p className="font-semibold text-sm text-blue-400">
              {item.grade}
            </p>

        {item.location && (
          <p className="text-sm text-zinc-500">
            {item.location}
          </p>
        )}

        <div className="mt-5 space-y-2">

          {item.description?.map((desc, i) => (
            <p
              key={i}
              className="leading-7 text-zinc-400"
            >
              • {desc}
            </p>
          ))}

        </div>

        <div className="mt-6 flex flex-wrap gap-2">

          {badges.map((badge) => (
            <span
              key={badge}
              className="
                rounded-full
                border
                border-blue-500/30
                bg-blue-500/10
                px-3
                py-1
                text-sm
                text-blue-300
              "
            >
              {badge}
            </span>
          ))}

        </div>

      </motion.div>

    </div>
  );
};

export default memo(JourneyCard);