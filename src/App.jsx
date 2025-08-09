import SearchBar from "./Assist_Components/SearchBar.jsx";
import WeatherCard from "./Assist_Components/WeatherCard.jsx";
import { useState } from "react";
import useWeatherData from "./Server.js";
import WeatherStats from "./Assist_Components/WeatherStats.jsx";
import Forecast from "./Assist_Components/Forecast.jsx";
import Loading from "./Assist_Components/Loading.jsx";
import Error from "./Assist_Components/Error.jsx";
import Greet from "./Assist_Components/Greet.jsx";

const App = () => {
  const [cityName, setCityName] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;
  const { currentWeather, forecast, loading, error } = useWeatherData(
    cityName,
    apiKey
  );

  const hasWeatherData =
    cityName.trim() !== "" && currentWeather && forecast.length > 0;

  return (
    <div className="w-screen h-screen bg-blue-400 flex justify-center items-center">
      <main className="h-[88%] w-[27%] bg-white px-9 py-5 rounded-md">
        <SearchBar cityName={cityName} setCityName={setCityName} />

        {loading && <Loading />}

        {error && <Error message={error} />}

        {!hasWeatherData && !loading && !error && <Greet />}

        {hasWeatherData && !loading && !error && (
          <>
            <WeatherCard
              temperature={currentWeather.main?.temp}
              condition={currentWeather.weather?.[0]?.main}
              iconCode={currentWeather.weather?.[0]?.icon}
              cityName={cityName}
            />

            <WeatherStats
              humidity={currentWeather.main?.humidity}
              windSpeed={(currentWeather.wind?.speed * 3.6).toFixed(1)}
            />

            <Forecast forecast={forecast} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
