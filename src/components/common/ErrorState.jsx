const ErrorState = ({
  title = "Something went wrong",
  message = "Unable to load data.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-5xl">⚠️</div>

      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-zinc-400">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="
            mt-8
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;