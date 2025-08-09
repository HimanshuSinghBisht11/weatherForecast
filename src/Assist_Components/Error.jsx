import ErrorImg from "./images/error.png";

const Error = ({ message }) => {
  return (
    <div className="h-full w-full">
      <img src={ErrorImg} alt="1" />
      <div className="flex items-center justify-center h-20 bg-blue-200 text-blue-600 border border-blue-300 rounded-md px-4 mt-4">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.578-1.14.94-2L13.94 4c-.525-.84-1.355-.84-1.88 0L5.06 17c-.638.86-.114 2 .94 2z"
          />
        </svg>
        <span className="text-xl font-medium">
          {message || "Something went wrong. Try again."}
        </span>
      </div>
    </div>
  );
};

export default Error;
