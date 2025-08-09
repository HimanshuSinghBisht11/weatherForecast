const Forecast = ({ forecast }) => {
  return (
    <section className="mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Forecast</h3>
      <div className="flex gap-2 overflow-x-auto scrollbar-thick scrollbar-thumb-gray-500 scrollbar-track-gray-400 pb-2">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg px-4 py-3 text-center flex-shrink-0 w-[5.35rem] border border-gray-200"
          >
            <p className="text-sm font-semibold text-gray-600 mb-1">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={day.icon}
              alt="weather icon"
              className="w-10 h-10 mx-auto mb-2"
            />
            <p className="text-lg font-bold text-gray-800">
              {Math.round(day.temp)}°C
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Forecast;
