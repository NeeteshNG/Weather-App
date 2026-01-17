import React, { useMemo } from "react";
import { SearchBar, WeatherCard, Forecast, Loading, Error } from "./components";
import { useWeather } from "./hooks/useWeather";
import "./App.css";

const getBackgroundClass = (temp, units) => {
  // Convert to Celsius if in Fahrenheit
  const tempC = units === "imperial" ? ((temp - 32) * 5) / 9 : temp;

  if (tempC < 10) return "bg-cold";
  if (tempC < 20) return "bg-cool";
  if (tempC < 30) return "bg-warm";
  return "bg-hot";
};

function App() {
  const {
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
  } = useWeather("Delhi, India");

  const backgroundClass = useMemo(() => {
    if (weatherData?.main?.temp) {
      return getBackgroundClass(weatherData.main.temp, units);
    }
    return "bg-default";
  }, [weatherData, units]);

  return (
    <div className={`app ${backgroundClass}`}>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            <i className="fas fa-cloud-sun"></i> Weather App
          </h1>
        </header>

        <SearchBar
          onSearch={searchLocation}
          searchHistory={searchHistory}
          onHistoryClick={searchLocation}
          onClearHistory={clearHistory}
        />

        <main className="main-content">
          {loading && <Loading />}

          {error && !loading && <Error message={error} onRetry={retry} />}

          {!loading && !error && weatherData && (
            <>
              <WeatherCard
                data={weatherData}
                units={units}
                onToggleUnits={toggleUnits}
              />
              <Forecast data={forecastData} units={units} />
            </>
          )}
        </main>

        <footer className="app-footer">
          <a
            href="https://github.com/NeeteshNG/Weather-App"
            target="_blank"
            rel="noreferrer"
            className="github-link"
          >
            <i className="fab fa-github"></i> View on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
