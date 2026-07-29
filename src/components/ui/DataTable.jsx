// import { motion } from "framer-motion";
// import EmptyState from "./EmptyState";

// const DataTable = ({
//   columns = [],
//   data = [],
//   renderRow,
// }) => {
//   if (!data.length) {
//     return (
//       <EmptyState
//         title="Nothing Found"
//         description="Start by creating your first item."
//       />
//     );
//   }

//   return (
//     <div
//       className="
//         overflow-hidden
//         rounded-3xl
//         border
//         border-zinc-800
//         bg-zinc-900/60
//         backdrop-blur-xl
//       "
//     >
//       {/* Header */}

//       <div
//         className="
//           hidden
//           grid-cols-12
//           gap-4
//           border-b
//           border-zinc-800
//           px-6
//           py-4
//           text-sm
//           font-semibold
//           uppercase
//           tracking-wider
//           text-zinc-400
//           lg:grid
//         "
//       >
//         {columns.map((column) => (
//           <div
//             key={column.key}
//             className={column.className}
//           >
//             {column.title}
//           </div>
//         ))}
//       </div>

//       {/* Body */}

//       <div>
//         {data.map((item, index) => (
//           <motion.div
//             key={item._id || index}
//             initial={{
//               opacity: 0,
//               y: 20,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               delay: index * 0.05,
//             }}
//           >
//             {renderRow(item)}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DataTable;
import { motion } from "framer-motion";

import EmptyState from "./EmptyState";
import TableSkeleton from "./TableSkeleton";

const DataTable = ({
  columns = [],
  data = [],
  renderRow,
  loading = false,
  emptyTitle = "Nothing Found",
  emptyDescription = "Start by creating your first item.",
  skeletonRows = 5,
}) => {
  if (loading) {
    return <TableSkeleton rows={skeletonRows} columns={columns.length} />;
  }

  if (!data.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/60
        backdrop-blur-xl
        shadow-2xl
      "
    >
      {/* Header */}

      <div
        className="
          hidden
          grid-cols-12
          gap-4
          border-b
          border-zinc-800
          bg-zinc-950/40
          px-6
          py-4
          text-sm
          font-semibold
          uppercase
          tracking-wider
          text-zinc-400
          lg:grid
        "
      >
        {columns.map((column) => (
          <div
            key={column.key}
            className={column.className}
          >
            {column.title}
          </div>
        ))}
      </div>

      {/* Body */}

      <div className="divide-y divide-zinc-800">
        {data.map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
              delay: index * 0.04,
            }}
          >
            {renderRow(item)}
          </motion.div>
        ))}
      </div>

      {/* Footer */}

      <div
        className="
          border-t
          border-zinc-800
          bg-zinc-950/30
          px-6
          py-3
          text-sm
          text-zinc-500
        "
      >
        Showing{" "}
        <span className="font-semibold text-white">
          {data.length}
        </span>{" "}
        item{data.length !== 1 && "s"}
      </div>
    </motion.div>
  );
};

export default DataTable;