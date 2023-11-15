import { useEffect, useState } from 'react';
import './App.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

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
      <section className="vh-100" style={{ backgroundColor: "#f5f6f7" }}>
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10" lg="8" xl="6">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-primary mt-2" onClick={handleSearch}>
                Search
              </button>
            </div>
            {weatherData && (
              <MDBCard
                className="bg-dark text-white"
                style={{ borderRadius: "40px" }}
              >
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    </div>
  );
}

export default App;
