const Loading = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-2 text-blue-500 font-semibold">Loading weather...</p>
    </div>
  );
};

export default Loading;
