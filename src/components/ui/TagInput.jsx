import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TagInput = ({
  label,
  tags = [],
  setTags,
  placeholder = "Press Enter...",
}) => {
  const [value, setValue] = useState("");

  const addTag = () => {
    const tag = value.trim();

    if (!tag) return;

    if (tags.includes(tag)) {
      setValue("");
      return;
    }

    setTags([...tags, tag]);
    setValue("");
  };

  <button type="button" onClick={addTag}>
    Add
  </button>;

  const removeTag = (tag) => {
    setTags(tags.filter((item) => item !== tag));
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-zinc-300">
          {label}
        </label>
      )}

      <div
        className="
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-900/70
        p-3
      "
      >
        <div className="mb-3 flex flex-wrap gap-2">
          <AnimatePresence>
            {tags.map((tag) => (
              <motion.div
                key={tag}
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0,
                }}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-600/20
                  px-3
                  py-1
                  text-sm
                  text-blue-400
                "
              >
                {tag}

                <button type="button" onClick={() => removeTag(tag)}>
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => console.log("KEYUP:", e.key)}
          onKeyDown={(e) => console.log("KEYDOWN:", e.key)}
        /> */}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          // placeholder={placeholder}
          // onKeyUp={addTag}
          onKeyDown={(e) => {
            if (e.key === "," || e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
      </div>
    </div>
  );
};

export default TagInput;
