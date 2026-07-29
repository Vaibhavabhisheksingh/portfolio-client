import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">

      <ChevronDown
        size={34}
        className="text-zinc-500"
      />

    </div>
  );
};

export default ScrollIndicator;