import { useEffect, useState, useMemo } from "react";

const getGradientByCondition = (condition = "") => {
  const lower = condition.toLowerCase();
  if (lower.includes("clear") || lower.includes("sunny"))
    return "from-yellow-300 to-orange-400";
  if (lower.includes("cloud")) return "from-blue-500 to-blue-300";
  if (lower.includes("rain")) return "from-gray-700 to-blue-400";
  if (lower.includes("snow")) return "from-blue-200 to-white";
  if (lower.includes("thunder")) return "from-purple-600 to-gray-800";
  return "from-blue-300 to-blue-500";
};

const WeatherCard = ({ cityName, temperature, condition, iconCode }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [animate, setAnimate] = useState(false);

  const temp = isCelsius
    ? Math.round(temperature)
    : Math.round((temperature * 9) / 5 + 32);

  const cleanIconCode = iconCode === "01n" ? "01d" : iconCode;
  const iconUrl = `https://openweathermap.org/img/wn/${cleanIconCode}@4x.png`;
  const backgroundGradient = useMemo(
    () => getGradientByCondition(condition),
    [condition]
  );

  const capitalizeFirstLetter = (cityName) => {
    return cityName.charAt(0).toUpperCase() + cityName.slice(1);
  };

  useEffect(() => {
    if (!iconCode) return;
    setAnimate(false);
    requestAnimationFrame(() => setAnimate(true));
  }, [iconCode]);

  return (
    <section
      className={`w-full rounded-2xl text-gray-600 shadow-xl p-6 bg-gradient-to-br relative overflow-hidden mt-3`}
    >
      <h2 className="text-2xl font-semibold">
        {capitalizeFirstLetter(cityName)}
      </h2>

      <div className="absolute top-4 right-4 h-24 w-24">
        <img src={iconUrl} alt={condition} className="w-full h-full" />
      </div>

      <div className="mt-6 z-10 relative">
        <p className="text-6xl font-bold">
          {temp}°
          <span
            className="text-5xl font-medium ml-1 cursor-pointer"
            onClick={() => setIsCelsius(!isCelsius)}
          >
            {isCelsius ? "C" : "F"}
          </span>
        </p>
        <p className="text-lg capitalize">{condition}</p>
      </div>
    </section>
  );
};

export default WeatherCard;
