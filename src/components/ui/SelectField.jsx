import { ChevronDown } from "lucide-react";

const SelectField = ({
  label,
  options = [],
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-zinc-300">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          {...props}
          className={`
            w-full
            appearance-none
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-900/70
            px-4
            py-3
            pr-10
            text-white
            outline-none
            transition-all
            duration-300
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            ${error ? "border-red-500 focus:ring-red-500/20" : ""}
            ${className}
          `}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-zinc-900"
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;