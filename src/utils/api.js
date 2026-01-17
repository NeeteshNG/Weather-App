const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (location, units = "metric") => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${location}&units=${units}&appid=${API_KEY}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling and try again.");
    }
    throw new Error("Failed to fetch weather data. Please try again.");
  }

  return response.json();
};

export const fetchForecast = async (location, units = "metric") => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${location}&units=${units}&appid=${API_KEY}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling and try again.");
    }
    throw new Error("Failed to fetch forecast data. Please try again.");
  }

  return response.json();
};

export const getWeatherIconUrl = (iconCode, size = "") => {
  return `https://openweathermap.org/img/wn/${iconCode}${size}.png`;
};

export const formatTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
};

export const formatDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

export const fetchCitySuggestions = async (query) => {
  if (!query || query.length < 2) return [];

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return data.map((city) => ({
    name: city.name,
    country: city.country,
    state: city.state,
    display: city.state
      ? `${city.name}, ${city.state}, ${city.country}`
      : `${city.name}, ${city.country}`,
  }));
};
