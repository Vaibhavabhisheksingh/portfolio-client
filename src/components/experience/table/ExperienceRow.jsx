import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Calendar,
  MapPin,
  Briefcase,
  Star,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const employmentColors = {
  "Full-time":
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

  Internship:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",

  Freelance:
    "bg-purple-500/10 text-purple-400 border-purple-500/20",

  Contract:
    "bg-orange-500/10 text-orange-400 border-orange-500/20",

  "Part-time":
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

  "Self-Employed":
    "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

const workModeColors = {
  Remote:
    "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",

  Hybrid:
    "bg-violet-500/10 text-violet-400 border-violet-500/20",

  "On-site":
    "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const ExperienceRow = ({
  experience,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      layout
      whileHover={{
        y: -2,
      }}
      className="
        rounded-3xl
        border-b
        border-zinc-800
        px-6
        py-5
        transition
        hover:bg-zinc-900/40
      "
    >
      {/* Desktop */}

      <div className="hidden lg:grid grid-cols-12 items-center gap-4">

        {/* Logo */}

        <div className="col-span-2">

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
            "
          >
            {experience.companyLogo?.url ? (
              <img
                src={experience.companyLogo.url}
                alt={experience.company}
                className="h-full w-full object-cover"
              />
            ) : (
              <span
                className="
                  text-2xl
                  font-bold
                  text-blue-400
                "
              >
                {experience.company?.charAt(0)}
              </span>
            )}
          </div>

        </div>

        {/* Company */}

        <div className="col-span-3">

          <div className="flex items-center gap-2">

            <h3 className="font-semibold text-white">
              {experience.company}
            </h3>

            {experience.currentlyWorking && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  bg-emerald-500/10
                  px-2
                  py-1
                  text-xs
                  text-emerald-400
                "
              >
                <Star
                  size={11}
                  fill="currentColor"
                />
                Current
              </span>
            )}

          </div>

          <p className="mt-1 text-sm text-zinc-400">
            {experience.jobTitle}
          </p>

        </div>

        {/* Employment */}

        <div className="col-span-3 space-y-2">

          <span
            className={`
              inline-flex
              rounded-full
              border
              px-3
              py-1
              text-xs
              font-medium
              ${
                employmentColors[
                  experience.employmentType
                ]
              }
            `}
          >
            {experience.employmentType}
          </span>

          <div className="flex items-center gap-2">

            <span
              className={`
                inline-flex
                items-center
                gap-1
                rounded-full
                border
                px-3
                py-1
                text-xs
                ${
                  workModeColors[
                    experience.workMode
                  ]
                }
              `}
            >
              <MapPin size={12} />

              {experience.workMode}
            </span>

          </div>

        </div>

        {/* Duration */}

        <div className="col-span-2">

          <div className="flex items-center gap-2 text-sm text-zinc-400">

            <Calendar size={15} />

            <span>

              {formatDate(
                experience.startDate
              )}

              {" - "}

              {experience.currentlyWorking
                ? "Present"
                : formatDate(
                    experience.endDate
                  )}

            </span>

          </div>

        </div>

        {/* Actions */}

        <div className="col-span-2 flex justify-end gap-2">

          <button
            type="button"
            onClick={() =>
              onEdit(experience)
            }
            className="
              rounded-xl
              bg-blue-600/20
              p-2
              text-blue-400
              transition
              hover:bg-blue-600/40
            "
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(experience)
            }
            className="
              rounded-xl
              bg-red-600/20
              p-2
              text-red-400
              transition
              hover:bg-red-600/40
            "
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      {/* Mobile */}

      <div className="space-y-5 lg:hidden">

        <div className="flex items-start gap-4">

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
            "
          >
            {experience.companyLogo?.url ? (
              <img
                src={experience.companyLogo.url}
                alt={experience.company}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-blue-400">
                {experience.company?.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="font-semibold text-white">
                {experience.company}
              </h3>

              {experience.currentlyWorking && (
                <span
                  className="
                    rounded-full
                    bg-emerald-500/10
                    px-2
                    py-1
                    text-xs
                    text-emerald-400
                  "
                >
                  Current
                </span>
              )}

            </div>

            <p className="text-sm text-zinc-400">
              {experience.jobTitle}
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-2">

          <span
            className={`rounded-full border px-3 py-1 text-xs ${
              employmentColors[
                experience.employmentType
              ]
            }`}
          >
            {experience.employmentType}
          </span>

          <span
            className={`rounded-full border px-3 py-1 text-xs ${
              workModeColors[
                experience.workMode
              ]
            }`}
          >
            {experience.workMode}
          </span>

        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-400">

          <Calendar size={15} />

          <span>

            {formatDate(experience.startDate)}

            {" - "}

            {experience.currentlyWorking
              ? "Present"
              : formatDate(
                  experience.endDate
                )}

          </span>

        </div>

        <div className="flex justify-end gap-2">

          <button
            type="button"
            onClick={() =>
              onEdit(experience)
            }
            className="
              rounded-xl
              bg-blue-600/20
              p-2
              text-blue-400
            "
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(experience)
            }
            className="
              rounded-xl
              bg-red-600/20 
              p-2
              text-red-400
            "
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default ExperienceRow;