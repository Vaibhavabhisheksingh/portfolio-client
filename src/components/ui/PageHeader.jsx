import { motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";

const PageHeader = ({
  title,
  subtitle,
  buttonText,
  buttonIcon,
  onButtonClick,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        mb-8
        flex
        flex-col
        gap-6
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <div>
        <h1 className="text-4xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-2 text-zinc-400">
          {subtitle}
        </p>
      </div>

      {buttonText && (
        <PrimaryButton
          icon={buttonIcon}
          onClick={onButtonClick}
        >
          {buttonText}
        </PrimaryButton>
      )}
    </motion.div>
  );
};

export default PageHeader;