import ContactRow from "./ContactRow";
import { Loader2 } from "lucide-react";

const ContactTable = ({
  loading,
  messages,
  onView,
  onDelete,
}) => {

  if (loading) {
    return (
      <div
        className="
          flex
          h-72
          items-center
          justify-center
        "
      >
        <Loader2
          size={40}
          className="
            animate-spin
            text-blue-500
          "
        />
      </div>
    );
  }

  return (
    <>
      {/* ========================= */}
      {/* Mobile Cards */}
      {/* ========================= */}

      <div
        className="
          flex
          flex-col
          gap-4

          md:hidden
        "
      >
        {messages.map((message) => (
          <ContactRow
            key={message._id}
            message={message}
            mobile
            onView={onView}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* ========================= */}
      {/* Desktop Table */}
      {/* ========================= */}

      <div
        className="
          hidden
          overflow-hidden
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900/40

          md:block
        "
      >

        {/* Header */}

        <div
          className="
            grid
            grid-cols-12
            border-b
            border-zinc-800
            bg-zinc-900/70
            px-6
            py-4
            text-sm
            font-semibold
            uppercase
            tracking-wide
            text-zinc-400
          "
        >

          <div className="col-span-2">
            Name
          </div>

          <div className="col-span-3">
            Email
          </div>

          <div className="col-span-3">
            Subject
          </div>

          <div className="col-span-2">
            Status
          </div>

          <div className="col-span-2 text-right">
            Actions
          </div>

        </div>

        {/* Rows */}

        <div>

          {messages.map((message) => (

            <ContactRow
              key={message._id}
              message={message}
              onView={onView}
              onDelete={onDelete}
            />

          ))}

        </div>

      </div>

    </>
  );
};

export default ContactTable;