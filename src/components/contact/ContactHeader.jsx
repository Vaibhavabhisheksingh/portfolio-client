import { motion } from "framer-motion";
import {
  Search,
  Mail,
  MailOpen,
} from "lucide-react";

const ContactHeader = ({
  search,
  setSearch,
  filter,
  setFilter,
  totalMessages,
  unreadMessages,
}) => {
  return (
    <div className="space-y-6">

      {/* Heading */}

      <div
        className="
          flex
          flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>

          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Contact Messages
          </h1>

          <p
            className="
              mt-2
              text-zinc-400
            "
          >
            Manage messages sent from your portfolio.
          </p>

        </div>

      </div>

      {/* Stats */}

      <div
        className="
          grid
          gap-4

          grid-cols-1

          sm:grid-cols-2
        "
      >

        <motion.div
          whileHover={{
            y: -3,
          }}
          className="
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900/50
            p-5
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                rounded-2xl
                bg-blue-600/20
                p-4
              "
            >
              <Mail
                size={24}
                className="text-blue-400"
              />
            </div>

            <div>

              <p className="text-zinc-400">
                Total Messages
              </p>

              <h2
                className="
                  text-3xl
                  font-bold
                  text-white
                "
              >
                {totalMessages}
              </h2>

            </div>

          </div>

        </motion.div>

        <motion.div
          whileHover={{
            y: -3,
          }}
          className="
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900/50
            p-5
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                rounded-2xl
                bg-yellow-500/20
                p-4
              "
            >
              <MailOpen
                size={24}
                className="text-yellow-400"
              />
            </div>

            <div>

              <p className="text-zinc-400">
                Unread Messages
              </p>

              <h2
                className="
                  text-3xl
                  font-bold
                  text-white
                "
              >
                {unreadMessages}
              </h2>

            </div>

          </div>

        </motion.div>

      </div>

      {/* Search + Filter */}

      <div
        className="
          flex
          flex-col
          gap-4

          lg:flex-row
        "
      >

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />

          <input
            type="text"
            placeholder="Search by name, email or subject..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-zinc-700
              bg-zinc-900
              py-3
              pl-11
              pr-4
              text-white
              outline-none
              transition

              focus:border-blue-500
            "
          />

        </div>

        {/* Filter */}

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-900
            px-5
            py-3
            text-white
            outline-none

            lg:w-56
          "
        >

          <option value="all">
            All Messages
          </option>

          <option value="read">
            Read
          </option>

          <option value="unread">
            Unread
          </option>

        </select>

      </div>

    </div>
  );
};

export default ContactHeader;