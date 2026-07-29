import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  ExternalLink,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const CertificateRow = ({
  certificate,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      {/* ================= Desktop ================= */}

      <motion.div
        layout
        whileHover={{
          backgroundColor: "rgba(39,39,42,.45)",
        }}
        className="
          hidden
          lg:grid
          grid-cols-12
          items-center
          gap-4
          border-b
          border-zinc-800
          px-6
          py-5
          transition
        "
      >
        {/* Image */}

        <div className="col-span-2">
          <div
            className="
              h-16
              w-16
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
            "
          >
            {certificate.image?.url ? (
              <img
                src={certificate.image.url}
                alt={certificate.title}
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
                  from-yellow-500
                  to-orange-500
                "
              >
                <Award
                  className="text-white"
                  size={28}
                />
              </div>
            )}
          </div>
        </div>

        {/* Title */}

        <div className="col-span-3">
          <h3 className="font-semibold text-white">
            {certificate.title}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            ID:
            {" "}
            {certificate.credentialId || "-"}
          </p>
        </div>

        {/* Issuer */}

        <div className="col-span-2">
          <p className="font-medium text-white">
            {certificate.issuer}
          </p>
        </div>

        {/* Date */}

        <div className="col-span-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Calendar size={15} />

            {formatDate(certificate.issueDate)}
          </div>
        </div>

        {/* Featured */}

        <div className="col-span-1">
          {certificate.featured ? (
            <Star
              fill="currentColor"
              className="text-yellow-400"
            />
          ) : (
            "-"
          )}
        </div>

        {/* Actions */}

        <div className="col-span-2 flex justify-end gap-2">
          {certificate.credentialURL && (
            <a
              href={certificate.credentialURL}
              target="_blank"
              rel="noreferrer"
              className="
                rounded-xl
                bg-emerald-500/20
                p-2
                text-emerald-400
              "
            >
              <ExternalLink size={17} />
            </a>
          )}

          <button
            type="button"
            onClick={() =>
              onEdit(certificate)
            }
            className="
              rounded-xl
              bg-blue-600/20
              p-2
              text-blue-400
            "
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(certificate)
            }
            className="
              rounded-xl
              bg-red-600/20
              p-2
              text-red-400
            "
          >
            <Trash2 size={17} />
          </button>
        </div>
      </motion.div>

      {/* ================= Mobile ================= */}

      <motion.div
        layout
        whileTap={{ scale: 0.98 }}
        className="
          lg:hidden
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900/50
          p-5
          mb-4
        "
      >
        <div className="flex gap-4">
          <div
            className="
              h-20
              w-20
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
            "
          >
            {certificate.image?.url ? (
              <img
                src={certificate.image.url}
                alt={certificate.title}
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
                  from-yellow-500
                  to-orange-500
                "
              >
                <Award
                  size={32}
                  className="text-white"
                />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-white">
              {certificate.title}
            </h3>

            <p className="text-sm text-zinc-400">
              {certificate.issuer}
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              {formatDate(certificate.issueDate)}
            </p>

            {certificate.featured && (
              <span
                className="
                  mt-2
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  bg-yellow-500/15
                  px-3
                  py-1
                  text-xs
                  text-yellow-400
                "
              >
                <Star
                  size={13}
                  fill="currentColor"
                />
                Featured
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {certificate.credentialURL && (
            <a
              href={certificate.credentialURL}
              target="_blank"
              rel="noreferrer"
              className="
                rounded-xl
                bg-emerald-500/20
                p-3
                text-emerald-400
              "
            >
              <ExternalLink size={18} />
            </a>
          )}

          <button
            onClick={() =>
              onEdit(certificate)
            }
            className="
              rounded-xl
              bg-blue-600/20
              p-3
              text-blue-400
            "
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() =>
              onDelete(certificate)
            }
            className="
              rounded-xl
              bg-red-600/20
              p-3
              text-red-400
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default CertificateRow;