import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import LocationDisplay from "./components/LocationDisplay/LocationDisplay";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [mapUrl, setMapUrl] = useState("");
  const [displayLocation, setDisplayLocation] = useState(false);
  const [weather, setWeather] = useState([]);

  async function getWeather() {
    const api = `http://localhost:8081/weather?lat=48.86&lon=2.35`;

    const res = await axios.get(api);

    setWeather(res.data);

    // console.log(weather);
  }

  useEffect(() => {
    getWeather();
  }, []);

  async function getLocation(event) {
    try {
      event.preventDefault();
      const api = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;

      const response = await axios.get(api);
      setLocation(response.data[0]);

      setDisplayLocation(true);
      handleMap(response.data[0]);
      event.target.query.value = "";
    } catch (error) {
      window.alert(`This is not a real place. Status: ${error.name}`);
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
    </div>
  );
}

export default App;
