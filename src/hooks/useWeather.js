import { useState, useEffect, useCallback } from "react";
import { fetchCurrentWeather, fetchForecast } from "../utils/api";

const SEARCH_HISTORY_KEY = "weatherAppSearchHistory";
const MAX_HISTORY_ITEMS = 5;

export const useWeather = (initialLocation = "Delhi, India") => {
  const [location, setLocation] = useState(initialLocation);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("metric"); // metric = Celsius, imperial = Fahrenheit
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const addToHistory = useCallback((city) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== city.toLowerCase()
      );
      const newHistory = [city, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  }, []);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(location, units),
        fetchForecast(location, units),
      ]);

      setWeatherData(current);
      setForecastData(forecast);
      addToHistory(current.name);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [location, units, addToHistory]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const searchLocation = useCallback((newLocation) => {
    if (newLocation.trim()) {
      setLocation(newLocation.trim());
    }
  }, []);

  const toggleUnits = useCallback(() => {
    setUnits((prev) => (prev === "metric" ? "imperial" : "metric"));
  }, []);

  const retry = useCallback(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    weatherData,
    forecastData,
    loading,
    error,
    units,
    searchHistory,
    searchLocation,
    toggleUnits,
    clearHistory,
    retry,
  };
};
