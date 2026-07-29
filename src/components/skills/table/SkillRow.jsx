import { motion } from "framer-motion";
import { Pencil, Trash2, Star } from "lucide-react";
import { skillIcons } from "../../../utils/skillIcons";

const SkillRow = ({ skill, onEdit, onDelete }) => {
  const Icon = skillIcons[skill.icon?.toLowerCase()];

  return (
    <>
      {/* ================= MOBILE CARD ================= */}

      <motion.div
        layout
        whileHover={{ y: -2 }}
        className="
          mb-4
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900/60
          p-5
          backdrop-blur-xl
          lg:hidden
        "
      >
        {/* Top */}

        <div className="flex items-start justify-between">

          <div className="flex gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                text-2xl
              "
              style={{
                color: skill.color || "#3B82F6",
              }}
            >
              {Icon ? (
                <Icon />
              ) : (
                skill.name.charAt(0)
              )}
            </div>

            <div>

              <h3 className="font-semibold text-white">
                {skill.name}
              </h3>

              <span
                className="
                  mt-2
                  inline-flex
                  rounded-full
                  border
                  border-blue-500/20
                  bg-blue-500/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-blue-300
                "
              >
                {skill.category}
              </span>

              <p className="mt-2 text-xs text-zinc-500">
                Order #{skill.order}
              </p>

            </div>

          </div>

          {skill.featured && (
            <Star
              size={18}
              fill="currentColor"
              className="text-yellow-400"
            />
          )}

        </div>

        {/* Progress */}

        <div className="mt-6">

          <div className="mb-2 flex justify-between text-sm">

            <span className="text-zinc-400">
              Proficiency
            </span>

            <span className="font-semibold text-white">
              {skill.proficiency}%
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${skill.proficiency}%`,
              }}
              transition={{
                duration: 0.5,
              }}
              className="h-full rounded-full"
              style={{
                background:
                  skill.color || "#3B82F6",
              }}
            />

          </div>

        </div>

        {/* Actions */}

        <div className="mt-6 flex gap-3">

          <button
            type="button"
            onClick={() => onEdit(skill)}
            className="
              flex-1
              rounded-2xl
              bg-blue-600/20
              py-3
              text-blue-400
              transition
              hover:bg-blue-600/30
            "
          >
            <Pencil
              size={18}
              className="mx-auto"
            />
          </button>

          <button
            type="button"
            onClick={() => onDelete(skill)}
            className="
              flex-1
              rounded-2xl
              bg-red-600/20
              py-3
              text-red-400
              transition
              hover:bg-red-600/30
            "
          >
            <Trash2
              size={18}
              className="mx-auto"
            />
          </button>

        </div>

      </motion.div>

      {/* ================= DESKTOP TABLE ================= */}

      <motion.div
        layout
        whileHover={{
          backgroundColor:
            "rgba(39,39,42,0.45)",
          x: 4,
        }}
        className="
          hidden
          grid-cols-12
          items-center
          gap-4
          border-b
          border-zinc-800
          px-6
          py-5
          transition
          lg:grid
        "
      >
        {/* Icon */}

        <div className="col-span-1">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              text-2xl
            "
            style={{
              color:
                skill.color || "#3B82F6",
            }}
          >
            {Icon ? (
              <Icon />
            ) : (
              skill.name.charAt(0)
            )}
          </div>

        </div>

        {/* Name */}

        <div className="col-span-3">

          <h3 className="font-semibold text-white">
            {skill.name}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Order #{skill.order}
          </p>

        </div>

        {/* Category */}

        <div className="col-span-2">

          <span
            className="
              rounded-full
              border
              border-blue-500/20
              bg-blue-500/10
              px-3
              py-1
              text-xs
              font-medium
              text-blue-300
            "
          >
            {skill.category}
          </span>

        </div>

        {/* Progress */}

        <div className="col-span-3">

          <div className="mb-2 flex justify-between text-sm">

            <span className="text-zinc-400">
              Proficiency
            </span>

            <span className="font-semibold text-white">
              {skill.proficiency}%
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${skill.proficiency}%`,
              }}
              transition={{
                duration: 0.5,
              }}
              className="h-full rounded-full"
              style={{
                background:
                  skill.color || "#3B82F6",
              }}
            />

          </div>

        </div>

        {/* Actions */}

        <div className="col-span-3 flex justify-end gap-2">

          {skill.featured && (
            <button
              type="button"
              title="Featured Skill"
              className="
                rounded-xl
                bg-yellow-500/20
                p-2
                text-yellow-400
              "
            >
              <Star
                size={17}
                fill="currentColor"
              />
            </button>
          )}

          <button
            type="button"
            onClick={() => onEdit(skill)}
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
            onClick={() => onDelete(skill)}
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

      </motion.div>
    </>
  );
};

export default SkillRow;