import React from "react";
import { getWeatherIconUrl, formatTime } from "../utils/api";

const WeatherCard = ({ data, units, onToggleUnits }) => {
  if (!data) return null;

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const weatherInfo = weather[0];
  const tempUnit = units === "metric" ? "°C" : "°F";
  const speedUnit = units === "metric" ? "m/s" : "mph";

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="weather-icon-container">
          <img
            src={getWeatherIconUrl(weatherInfo.icon, "@2x")}
            alt={weatherInfo.description}
            className="weather-icon"
          />
        </div>

        <div className="weather-info">
          <h2 className="location-name">
            {name}, {country}
          </h2>
          <p className="weather-description">{weatherInfo.description}</p>

          <div className="temperature-container">
            <span className="temperature">{Math.round(temp)}</span>
            <span className="temp-unit">{tempUnit}</span>
            <button className="unit-toggle" onClick={onToggleUnits}>
              Switch to {units === "metric" ? "°F" : "°C"}
            </button>
          </div>

          <p className="feels-like">
            Feels like: {Math.round(feels_like)}
            {tempUnit}
          </p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <i className="fas fa-tint"></i>
          <div>
            <span className="detail-value">{humidity}%</span>
            <span className="detail-label">Humidity</span>
          </div>
        </div>

        <div className="detail-item">
          <i className="fas fa-wind"></i>
          <div>
            <span className="detail-value">
              {speed} {speedUnit}
            </span>
            <span className="detail-label">Wind</span>
          </div>
        </div>

        <div className="detail-item">
          <i className="fas fa-compress-arrows-alt"></i>
          <div>
            <span className="detail-value">{pressure} hPa</span>
            <span className="detail-label">Pressure</span>
          </div>
        </div>

        <div className="detail-item">
          <i className="fas fa-sun"></i>
          <div>
            <span className="detail-value">{formatTime(sunrise, timezone)}</span>
            <span className="detail-label">Sunrise</span>
          </div>
        </div>

        <div className="detail-item">
          <i className="fas fa-moon"></i>
          <div>
            <span className="detail-value">{formatTime(sunset, timezone)}</span>
            <span className="detail-label">Sunset</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
