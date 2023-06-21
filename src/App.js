import Nav from "./components/Nav";
import { useState } from "react";

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
        console.log(movies.Search);
      });
  };

  return (
    <>
      <Nav search={searchHandler} value={valueHandler} />
      <container className="flex flex-wrap justify-around">
        {movies &&
          movies.Search.map((movie) => (
            <div className="text-center mx-2">
              <h1>{movie.Title}</h1>
              <img src={movie.Poster} />
            </div>
          ))}
      </container>
    </>
  );
}

export default App;
