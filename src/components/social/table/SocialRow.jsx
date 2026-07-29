import { motion } from "framer-motion";

import {
  Pencil,
  Trash2,
  Star,
  ExternalLink,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaMedium,
  FaDev,
  FaGlobe,
  FaTwitter,
} from "react-icons/fa";

import {
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
  SiHackerrank,
  SiGeeksforgeeks,
} from "react-icons/si";

import { MdEmail } from "react-icons/md";

const socialIcons = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Portfolio: FaGlobe,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  YouTube: FaYoutube,
  Medium: FaMedium,
  "Dev.to": FaDev,
  Email: MdEmail,
  LeetCode: SiLeetcode,
  Codeforces: SiCodeforces,
  CodeChef: SiCodechef,
  HackerRank: SiHackerrank,
  GeeksforGeeks: SiGeeksforgeeks,
  Other: FaGlobe,
};

const SocialRow = ({
  social,
  onEdit,
  onDelete,
}) => {
  const Icon =
    socialIcons[social.platform] ||
    FaGlobe;

  return (
    <motion.div
      layout
      whileHover={{
        scale: 1.01,
      }}
      className="
      border-b
      border-zinc-800
      transition
      "
    >
      {/* Desktop */}

      <div
        className="
        hidden
        lg:grid
        grid-cols-12
        items-center
        gap-4
        px-6
        py-5
        "
      >
        {/* Platform */}

        <div className="col-span-2 flex items-center gap-3">
          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-500/10
            text-2xl
            text-blue-400
            "
          >
            <Icon />
          </div>

          <span className="font-semibold text-white">
            {social.platform}
          </span>
        </div>

        {/* Username */}

        <div className="col-span-3">
          <p className="truncate font-medium text-zinc-200">
            {social.username || "-"}
          </p>
        </div>

        {/* URL */}

        <div className="col-span-3">
          <a
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="
            flex
            items-center
            gap-2
            truncate
            text-blue-400
            hover:underline
            "
          >
            <span className="truncate">
              {social.url}
            </span>

            <ExternalLink size={15} />
          </a>
        </div>

        {/* Featured */}

        <div className="col-span-2">
          {social.featured ? (
            <span
              className="
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-yellow-500/15
              px-3
              py-1
              text-xs
              font-semibold
              text-yellow-400
              "
            >
              <Star
                size={13}
                fill="currentColor"
              />
              Featured
            </span>
          ) : (
            <span className="text-zinc-500">
              —
            </span>
          )}
        </div>

        {/* Actions */}

        <div className="col-span-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onEdit(social)}
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
              onDelete(social)
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

      <div
        className="
        space-y-4
        p-5
        lg:hidden
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-500/10
            text-2xl
            text-blue-400
            "
          >
            <Icon />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-white">
              {social.platform}
            </h3>

            <p className="truncate text-sm text-zinc-400">
              {social.username || "-"}
            </p>
          </div>
        </div>

        <a
          href={social.url}
          target="_blank"
          rel="noreferrer"
          className="
          block
          truncate
          text-sm
          text-blue-400
          hover:underline
          "
        >
          {social.url}
        </a>

        <div className="flex items-center justify-between">
          {social.featured ? (
            <span
              className="
              rounded-full
              bg-yellow-500/15
              px-3
              py-1
              text-xs
              font-medium
              text-yellow-400
              "
            >
              Featured
            </span>
          ) : (
            <span />
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(social)}
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
                onDelete(social)
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
      </div>
    </motion.div>
  );
};

export default SocialRow;