import React from "react";
import { getWeatherIconUrl, formatDay } from "../utils/api";

const Forecast = ({ data, units }) => {
  if (!data || !data.list) return null;

  // Get one forecast per day (every 8th item = 24 hours, since data is 3-hourly)
  const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);
  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-list">
        {dailyForecasts.map((item, index) => (
          <div key={index} className="forecast-item">
            <span className="forecast-day">{formatDay(item.dt)}</span>
            <img
              src={getWeatherIconUrl(item.weather[0].icon)}
              alt={item.weather[0].description}
              className="forecast-icon"
            />
            <span className="forecast-temp">
              {Math.round(item.main.temp)}{tempUnit}
            </span>
            <span className="forecast-desc">{item.weather[0].main}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
