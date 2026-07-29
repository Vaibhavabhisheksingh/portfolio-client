import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Calendar,
  Award,
  BookOpen,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const EducationRow = ({
  education,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        backgroundColor: "rgba(39,39,42,.45)",
      }}
      className="
        border-b
        border-zinc-800
        p-4
        transition
        lg:grid
        lg:grid-cols-12
        lg:items-center
        lg:gap-4
        lg:px-6
        lg:py-5
      "
    >
      {/* Mobile & Tablet */}

      <div className="lg:hidden">

        <div className="flex items-start gap-4">

          {/* Logo */}

          <div
            className="
              flex
              h-16
              w-16
              flex-shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
            "
          >
            {education.institutionLogo?.url ? (
              <img
                src={education.institutionLogo.url}
                alt={education.institution}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  bg-gradient-to-br
                  from-blue-600
                  to-indigo-600
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {education.institution
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="truncate text-lg font-semibold text-white">
                {education.institution}
              </h3>

              {education.currentlyStudying && (
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-400">
                  Studying
                </span>
              )}

            </div>

            <p className="mt-1 text-sm text-zinc-400">
              {education.fieldOfStudy}
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm text-white">

              <BookOpen size={15} />

              <span>{education.degree}</span>

            </div>

            {education.grade && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
                <Award size={13} />
                {education.grade}
              </div>
            )}

            <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">

              <Calendar size={15} />

              <span>
                {formatDate(
                  education.startDate
                )}
                {" - "}
                {education.currentlyStudying
                  ? "Present"
                  : formatDate(
                      education.endDate
                    )}
              </span>

            </div>

            <div className="mt-5 flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  onEdit(education)
                }
                className="
                  rounded-xl
                  bg-blue-600/20
                  p-2.5
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
                  onDelete(education)
                }
                className="
                  rounded-xl
                  bg-red-600/20
                  p-2.5
                  text-red-400
                  transition
                  hover:bg-red-600/40
                "
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Desktop */}

      <>
        <div className="hidden lg:block lg:col-span-2">

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
            {education.institutionLogo?.url ? (
              <img
                src={education.institutionLogo.url}
                alt={education.institution}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  bg-gradient-to-br
                  from-blue-600
                  to-indigo-600
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {education.institution
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>
            )}
          </div>

        </div>

        <div className="hidden lg:block lg:col-span-3">

          <div className="flex items-center gap-2">

            <h3 className="font-semibold text-white">
              {education.institution}
            </h3>

            {education.currentlyStudying && (
              <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-400">
                Studying
              </span>
            )}

          </div>

          <p className="mt-1 text-sm text-zinc-500">
            {education.fieldOfStudy}
          </p>

        </div>

        <div className="hidden space-y-2 lg:block lg:col-span-3">

          <div className="flex items-center gap-2">

            <BookOpen
              size={15}
              className="text-blue-400"
            />

            <span className="text-sm text-white">
              {education.degree}
            </span>

          </div>

          {education.grade && (
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
              <Award size={13} />
              {education.grade}
            </div>
          )}

        </div>

        <div className="hidden lg:block lg:col-span-2">

          <div className="flex items-center gap-2 text-sm text-zinc-400">

            <Calendar size={15} />

            <span>
              {formatDate(
                education.startDate
              )}
              {" - "}
              {education.currentlyStudying
                ? "Present"
                : formatDate(
                    education.endDate
                  )}
            </span>

          </div>

        </div>

        <div className="hidden justify-end gap-2 lg:flex lg:col-span-2">

          <button
            type="button"
            onClick={() =>
              onEdit(education)
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
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(education)
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
            <Trash2 size={17} />
          </button>

        </div>
      </>
    </motion.div>
  );
};

export default EducationRow;