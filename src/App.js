import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("norwich");

  async function getLocation() {
    const api = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;

    const response = await axios.get(api);

    console.log(response.data[0]);
  }

  return (
    <div className="App">
      <form>
        <input type="text" placeholder="enter location name" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
