import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  page,
  totalPages,
  onPrevious,
  onNext,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-between">

      <button
        onClick={onPrevious}
        disabled={page === 1}
        className="
          rounded-xl
          border
          border-zinc-700
          px-5
          py-3
          text-white
          transition
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <ChevronLeft size={18} />

      </button>

      <span className="text-zinc-400">

        Page {page} of {totalPages}

      </span>

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="
          rounded-xl
          border
          border-zinc-700
          px-5
          py-3
          text-white
          transition
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <ChevronRight size={18} />

      </button>

    </div>
  );
};

export default Pagination;