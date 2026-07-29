import { useRef } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  FileText,
  Trash2,
} from "lucide-react";

const ResumeUploader = ({
  resumeName,
  onChange,
  onRemove,
  label = "Resume",
}) => {
  const inputRef = useRef();

  return (
    <div className="space-y-3">

      <label className="block text-sm font-medium text-zinc-300">
        {label}
      </label>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf,.doc,.docx"
        onChange={onChange}
      />

      {!resumeName ? (

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          onClick={() =>
            inputRef.current?.click()
          }
          className="
            flex
            h-56
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-3xl
            border-2
            border-dashed
            border-zinc-700
            bg-zinc-900/40
            transition
            hover:border-blue-500
          "
        >

          <UploadCloud
            size={45}
            className="text-blue-500"
          />

          <p className="mt-5 text-white">
            Click to upload Resume
          </p>

          <p className="text-sm text-zinc-500">
            PDF • DOC • DOCX
          </p>

        </motion.div>

      ) : (

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            flex
            flex-col
            gap-4
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900/40
            p-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-blue-600/20
              "
            >
              <FileText
                size={28}
                className="text-blue-400"
              />
            </div>

            <div>

              <p className="font-medium text-white break-all">
                {resumeName}
              </p>

              <p className="text-sm text-zinc-500">
                Resume Selected
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={() =>
                inputRef.current?.click()
              }
              className="
                rounded-xl
                bg-blue-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-blue-500
              "
            >
              Replace
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="
                rounded-xl
                bg-red-600
                p-3
                text-white
                transition
                hover:bg-red-500
              "
            >
              <Trash2 size={18} />
            </button>

          </div>

        </motion.div>

      )}

    </div>
  );
};

export default ResumeUploader;