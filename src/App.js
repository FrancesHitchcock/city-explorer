import { useState } from "react";
import "./App.css";
import axios from "axios";

import LocationDisplay from "./components/LocationDisplay/LocationDisplay";
import Weather from "./Weather/Weather";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [mapUrl, setMapUrl] = useState("");
  const [displayLocation, setDisplayLocation] = useState(false);
  const [weather, setWeather] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);

  async function getWeather({ lat, lon }) {
    const api = `http://localhost:8081/weather?lat=${lat}&lon=${lon}`;

    const res = await axios.get(api);

    setWeather(res.data);
  }

  async function getLocation(event) {
    setWeather([]);
    try {
      event.preventDefault();
      const api = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;

      const response = await axios.get(api);
      setLocation(response.data[0]);

      setDisplayLocation(true);
      handleMap(response.data[0]);
      getWeather(response.data[0]);
      event.target.query.value = "";
      setSearchInitiated(true);
    } catch (error) {
      console.log(error);
      window.alert(`${error.message}`);

      event.target.reset();

      setDisplayLocation(false);
    } finally {
      setSearchQuery("");
    }
  }

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleMap(data) {
    const url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${data.lat},${data.lon}&zoom=10`;

    setMapUrl(url);
  }

  return (
    <div className="App">
      <h1>Location Search</h1>
      <form onSubmit={getLocation}>
        <input
          type="text"
          name="query"
          placeholder="enter location name"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Explore</button>
      </form>

      {displayLocation && (
        <LocationDisplay
          name={location.display_name}
          lat={location.lat}
          lon={location.lon}
          mapUrl={mapUrl}
        />
      )}
      {weather.length > 0 && (
        <Weather weather={weather} location={location.display_name} />
      )}
      {searchInitiated && weather.length === 0 && (
        <div>
          <h2>Weather data not available for {location.display_name}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
