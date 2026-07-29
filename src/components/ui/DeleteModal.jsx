import { Trash2 } from "lucide-react";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";

const DeleteModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  title = "Delete Item",
  message = "This action cannot be undone.",
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="space-y-8">

        <div className="flex justify-center">
          <div className="rounded-full bg-red-500/10 p-5">
            <Trash2
              size={36}
              className="text-red-500"
            />
          </div>
        </div>

        <p className="text-center text-zinc-400">
          {message}
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              border-zinc-700
              px-5
              py-3
              text-white
              transition
              hover:bg-zinc-800
            "
          >
            Cancel
          </button>

          <PrimaryButton
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </PrimaryButton>

        </div>

      </div>
    </Modal>
  );
};

export default DeleteModal;