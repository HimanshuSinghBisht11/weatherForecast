import { useRef, useState, useEffect } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ cityName, setCityName }) => {
  const inputRef = useRef(null);
  const [searchedValue, setSearchedValue] = useState("");
  const [inputValue, setInputValue] = useState(cityName || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setInputValue(cityName || "");
  }, [cityName]);

  useEffect(() => {
    if (!inputValue.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchSuggestions(inputValue);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  const fetchSuggestions = async (query) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&cnt=20&appid=${apiKey}`
      );
      const data = await res.json();
      if (data.list) {
        const seenCountries = new Set();
        const uniqueSuggestions = data.list.filter((city) => {
          if (seenCountries.has(city.sys.country)) return false;
          seenCountries.add(city.sys.country);
          return true;
        });

        setSuggestions(
          uniqueSuggestions.map((city) => `${city.name}, ${city.sys.country}`)
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    const city = inputValue.trim();
    if (city) {
      setCityName(city);
      setSearchedValue(city);
      setTimeout(() => {
        setSuggestions([]);
      }, 200);
    }
  };

  const handleResetClick = () => {
    setCityName("");
    setInputValue("");
    setSearchedValue("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const isReset = searchedValue && inputValue === searchedValue;
  const handleClick = isReset ? handleResetClick : handleSearchClick;

  const handleSuggestionClick = (city) => {
    setInputValue(city);
    setCityName(city);
    setSearchedValue(city);
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  };

  return (
    <section className="h-[9%] w-full flex relative">
      <div className="h-full w-full bg-white flex border-[2px] border-solid border-black rounded-md relative">
        <input
          ref={inputRef}
          className="h-full w-[87%] pl-5 rounded-md outline-none border-none"
          type="text"
          placeholder="Search city..."
          spellCheck={false}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchClick();
          }}
        />
        <button
          className={`h-full w-[16%] flex justify-center items-center rounded-tr-md rounded-br-md transition-colors duration-200 ${
            isReset
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleClick}
          title={isReset ? "Clear" : "Search"}
        >
          {isReset ? (
            <X size={22} className="text-white" />
          ) : (
            <Search size={22} className="text-white" />
          )}
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {loading ? (
              <li className="px-4 py-2 text-gray-500">Loading...</li>
            ) : (
              suggestions.map((city, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSuggestionClick(city)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {city}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SearchBar;
