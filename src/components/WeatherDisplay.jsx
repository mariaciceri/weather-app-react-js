import { useState } from "react";
import axios from "axios";

export default function WeatherDisplay() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  function displayWeather(e) {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    console.log(apiKey);
    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  return (
    <>
      <div>
        <form onSubmit={displayWeather}>
          <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button>Get Weather</button>
        </form>
      </div>
      <div>
        {weather && (
          <div>
            <h2>{weather.location.name}</h2>
            <p>{weather.current.temp_c}°C</p>
            <img src={weather.current.condition.icon} alt="weather icon" />
          </div>
        )}
      </div>
    </>
  );
}
