import { motion } from "framer-motion";

const PageHeader = ({
  title,
  subtitle,
  action,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        mb-8
        flex
        flex-col
        gap-5

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="min-w-0">

        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
            text-white

            sm:text-4xl
          "
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-relaxed
              text-zinc-400

              sm:text-base
            "
          >
            {subtitle}
          </p>
        )}

      </div>

      {action && (
        <div
          className="
            flex
            shrink-0
            items-center
            justify-start

            sm:justify-end
          "
        >
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default PageHeader;