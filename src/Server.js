import { useEffect, useState } from "react";

const CACHE_EXPIRY_MINUTES = 30;

const isCacheFresh = (timestamp) => {
  const now = Date.now();
  const cacheTime = new Date(timestamp).getTime();
  const ageInMinutes = (now - cacheTime) / (1000 * 60);
  return ageInMinutes < CACHE_EXPIRY_MINUTES;
};

const useWeatherData = (cityName, apiKey) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityName) return;

    const cacheKey = cityName.toLowerCase();

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          if (isCacheFresh(parsed.timestamp)) {
            setCurrentWeather(parsed.currentWeather);
            setForecast(parsed.forecast);
            setLoading(false);
            return;
          }
        }

        const [currentRes, forecastRes] = await Promise.all([
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
          ),
          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
          ),
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
          throw new Error("City not found or API error.");
        }

        const [currentData, forecastData] = await Promise.all([
          currentRes.json(),
          forecastRes.json(),
        ]);

        const today = new Date().toISOString().split("T")[0];

        const filtered = forecastData.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        const formatted = filtered
          .filter((item) => !item.dt_txt.startsWith(today))
          .slice(0, 5)
          .map((item) => {
            const dateObj = new Date(item.dt_txt);
            return {
              date: dateObj.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              }),
              temp: item.main.temp,
              icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            };
          });

        const enrichedCurrent = {
          ...currentData,
          windKmph: Number((currentData.wind.speed * 3.6).toFixed(1)),
        };

        setCurrentWeather(enrichedCurrent);
        setForecast(formatted);

        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: new Date().toISOString(),
            currentWeather: enrichedCurrent,
            forecast: formatted,
          })
        );
      } catch (err) {
        setError(err.message);
        setCurrentWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [cityName]);

  return { currentWeather, forecast, loading, error };
};

export default useWeatherData;
