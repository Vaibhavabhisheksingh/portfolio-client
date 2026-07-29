import { Loader2 } from "lucide-react";

const Loader = ({
  height = "h-[60vh]",
  size = 42,
}) => {
  return (
    <div className={`flex ${height} items-center justify-center`}>
      <Loader2
        size={size}
        className="animate-spin text-blue-500"
      />
    </div>
  );
};

export default Loader;