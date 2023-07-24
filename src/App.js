import { useState } from "react";
import "./App.css";
import axios from "axios";

import LocationDisplay from "./components/LocationDisplay/LocationDisplay";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [displayLocation, setDisplayLocation] = useState(false);

  async function getLocation(event) {
    event.preventDefault();
    const api = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;

    const response = await axios.get(api);
    setLocation(response.data[0]);
    setDisplayLocation(true);
  }

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={getLocation}>
        <input
          type="text"
          name="query"
          placeholder="enter location name"
          onChange={handleChange}
        />
        <button type="submit">Explore</button>
      </form>

      {displayLocation && (
        <LocationDisplay
          name={location.display_name}
          lat={location.lat}
          lon={location.lon}
        />
      )}
    </div>
  );
}

export default App;
