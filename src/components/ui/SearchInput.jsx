import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        relative
        w-full
        max-w-md
      "
    >
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900/60
          py-3
          pl-12
          pr-12
          text-white
          backdrop-blur-xl
          outline-none
          transition
          placeholder:text-zinc-500
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
        "
      />

      {value && (
        <button
          onClick={onClear}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-zinc-500
            transition
            hover:text-white
          "
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
};

export default SearchInput;