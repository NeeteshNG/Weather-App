import { useEffect, useState } from "react";
import "./App.css";

const apiKey = "3ee93d1a25d6522bc6ea1f5cd2f93fbd";

function App() {
  const [location, setLocation] = useState("Juneau, Alaska, US");
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
        );

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error while fetching Data : ", error);
      }
    };
    fetchWeatherData();
  }, [location]);

  const handleSearch = () => {
    setLocation(search);
  };

  return (
    <div className="App">
      <section className="section-container">
        <div className="body-container">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                  Search
                </button>
              </div>
              {weatherData && (
                <div
                  className="icon-image"
                  style={{ borderRadius: "40px" }}
                >
                  <div className="bg-image" style={{ borderRadius: "35px" }}>
                    {/* Display weather image or icon */}
                    {weatherData.weather && weatherData.weather.length > 0 && (
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                        className="card-img"
                        alt="weather"
                      />
                    )}
                    <div
                      className="mask"
                    ></div>
                  </div>
                  <div className="weather-card">
                    <p className="location-name">
                      {weatherData.name},{" "}
                      {weatherData.sys && weatherData.sys.country}
                    </p>
                    <p className="temperature">
                      {weatherData.main && weatherData.main.temp}&deg;C
                    </p>
                    <p className="feels-like">
                      Feels Like:{" "}
                      <strong>
                        {weatherData.main && weatherData.main.feels_like}&deg;C
                      </strong>
                    </p>
                    {weatherData.weather && weatherData.weather.length > 0 && (
                      <p className="weather-type">
                        {weatherData.weather[0].main}
                      </p>
                    )}
                  </div>
                </div>
              )}
        </div>
      </section>
    </div>
  );
}

export default App;
