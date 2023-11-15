import { useEffect, useState } from 'react';
import './App.css';

const apiKey = "3ee93d1a25d6522bc6ea1f5cd2f93fbd";

function App() {
  const [location, setLocation] = useState("Juneau, Alaska, US");
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);

        const data = await response.json();
        setWeatherData(data);
      }catch (error) {
        console.error("Error while fetching Data : ", error);
      }
    };
    fetchWeatherData();
  }, [location]);

  const handleSearch = () => {
    setLocation(search);
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
