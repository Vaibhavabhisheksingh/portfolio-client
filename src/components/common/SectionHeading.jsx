import { memo } from "react";

const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-16">

      <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-3">
        {subtitle}
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-white">
        {title}
      </h2>

    </div>
  );
};

export default memo(SectionHeading);