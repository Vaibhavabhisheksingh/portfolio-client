import { useRef } from "react";
import { UploadCloud, Trash2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

const ImageUploader = ({
  image,
  preview,
  onChange,
  onRemove,
  label = "Project Image",
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
        accept="image/*"
        onChange={onChange}
      />

      {!preview ? (

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          onClick={() => inputRef.current.click()}
          className="
            flex
            h-64
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
            Click to upload
          </p>

          <p className="text-sm text-zinc-500">
            PNG • JPG • WEBP
          </p>

        </motion.div>

      ) : (

        <div className="relative overflow-hidden rounded-3xl">

          <img
            src={preview}
            alt="Preview"
            className="h-72 w-full object-cover"
          />

          <button
            type="button"
            onClick={onRemove}
            className="
              absolute
              right-4
              top-4
              rounded-xl
              bg-red-600
              p-3
              text-white
            "
          >
            <Trash2 size={18} />
          </button>

        </div>

      )}

    </div>
  );
};

export default ImageUploader;