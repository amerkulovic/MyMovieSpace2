import Nav from "./components/Nav";
import { useState } from "react";

function App() {
  let [movie, setMovie] = useState(null);
  let [name, setName] = useState("");

  const valueHandler = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  const searchHandler = async () => {
    await fetch(`http://www.omdbapi.com/?t=${name}&apikey=f14ca85d
  `)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        console.log(movie);
      });
  };

  return (
    <>
      <Nav search={searchHandler} value={valueHandler} />
      <h1>{movie.Title}</h1>
    </>
  );
}

export default App;
