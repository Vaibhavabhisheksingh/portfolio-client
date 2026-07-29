const TextAreaField = ({
  label,
  error,
  rows = 5,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-zinc-300" >
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        {...props}
        className={`
          w-full
          resize-none
          rounded-2xl
          border
          border-zinc-700
          bg-zinc-900/70
          px-4
          py-3
          text-white
          placeholder:text-zinc-500
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
          ${error ? "border-red-500 focus:ring-red-500/20" : ""}
          ${className}
        `
      }
      />

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextAreaField;