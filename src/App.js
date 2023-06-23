import Nav from "./components/Nav";
import "./App.css";
import { useState } from "react";
import Body from "./pages/Body";

function App() {
  let [movies, setMovies] = useState(null);
  let [name, setName] = useState("");

  const valueHandler = (event) => {
    setName(event.target.value);
  };

  const searchHandler = async () => {
    await fetch(`https://www.omdbapi.com/?apikey=f14ca85d&s=${name}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  };

  return (
    <>
      <Nav search={searchHandler} value={valueHandler} />
      <Body movies={movies} />
    </>
  );
}

export default App;
