const TableSkeleton = ({
  rows = 5,
}) => {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/60
      "
    >
      {/* Header */}

      <div
        className="
          h-14
          animate-pulse
          border-b
          border-zinc-800
          bg-zinc-800/40
        "
      />

      {/* Rows */}

      <div className="divide-y divide-zinc-800">
        {Array.from({ length: rows }).map(
          (_, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                gap-4
                px-6
                py-6
              "
            >
              <div className="h-14 w-14 animate-pulse rounded-xl bg-zinc-800" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-48 animate-pulse rounded bg-zinc-800" />

                <div className="h-3 w-64 animate-pulse rounded bg-zinc-800" />
              </div>

              <div className="h-10 w-24 animate-pulse rounded-lg bg-zinc-800" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TableSkeleton;