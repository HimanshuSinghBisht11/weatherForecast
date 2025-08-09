import { Droplets, Wind } from "lucide-react";

const WeatherStats = ({ humidity, windSpeed }) => (
  <section className="h-[12%] w-full flex justify-between mt-4 gap-4">
    <div className="flex items-center space-x-3 bg-blue-50 rounded-xl p-3 flex-1">
      <div className="bg-blue-200 p-2 rounded-lg">
        <Droplets className="text-blue-600" size={20} />
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">Humidity</p>
        <p className="text-gray-900 font-semibold text-base">{humidity}%</p>
      </div>
    </div>

    <div className="flex items-center space-x-3 bg-green-50 rounded-xl p-3 flex-1">
      <div className="bg-green-200 p-2 rounded-lg">
        <Wind className="text-green-600" size={20} />
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">Wind Speed</p>
        <p className="text-gray-900 font-semibold text-base">
          {windSpeed} km/h
        </p>
      </div>
    </div>
  </section>
);

export default WeatherStats;
