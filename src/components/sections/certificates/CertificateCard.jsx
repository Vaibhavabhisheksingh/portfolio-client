import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { memo } from "react";

const CertificateCard = ({ certificate }) => {
  const image =
    certificate.image?.url ||
    "https://placehold.co/600x400?text=Certificate";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/60
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-blue-500
        hover:shadow-xl
        hover:shadow-blue-500/10
      "
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={certificate.title}
          loading="lazy"
          decoding="async"
          className="
            h-56
            w-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />
      </div>

      <div className="p-6">

        <h3 className="text-xl font-bold text-white">
          {certificate.title}
        </h3>

        <p className="mt-2 text-blue-400">
          {certificate.issuer}
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Issued{" "}
          {new Date(certificate.issueDate).toLocaleDateString()}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">

          {certificate.skills?.map((skill) => (
            <span
              key={skill}
              className="
                rounded-full
                border
                border-blue-500/30
                bg-blue-500/10
                px-3
                py-1
                text-xs
                text-blue-300
              "
            >
              {skill}
            </span>
          ))}

        </div>

        {certificate.credentialURL && (
          <a
            href={certificate.image?.url}
            target="_blank"
            rel="noreferrer"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <ExternalLink size={18} />
            View Certificate
          </a>
        )}

      </div>
    </motion.div>
  );
};

export default memo(CertificateCard);