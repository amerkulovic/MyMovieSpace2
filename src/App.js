import Nav from "./components/Nav";
import "./App.css";
import { useState } from "react";
import MovieCard from "./components/MovieCard";

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
      <container className="flex flex-wrap justify-center background-image">{movies && movies.Search.map((movie) => <MovieCard moviePoster={movie.Poster} movieTitle={movie.Title} />)}</container>
    </>
  );
}

export default App;
