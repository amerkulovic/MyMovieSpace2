import Nav from "./components/Nav";
import "./App.css";
import { useState } from "react";
import Body from "./pages/Body";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieCard from "./components/MovieCard";

function App() {
  let [movies, setMovies] = useState(null);
  let [name, setName] = useState("");
  let [movieData, setMovieData] = useState(null);
  let [isMovieShown, setIsMovieShown] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const movieID = urlParams.get("i") || "";

  const showMovie = async () => {
    await fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=f14ca85d`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setMovieData(data);
        console.warn(movieData);
        setIsMovieShown(true);
      });
  };

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
    <Router>
      <>
        <Nav search={searchHandler} value={valueHandler} />
        <div className="background-image">
          <Routes>
            <Route path="/" element={<div className="flex flex-wrap justify-center">{movies && movies.Search.map((movie) => <MovieCard moviePoster={movie.Poster} movieTitle={movie.Title} imdbID={movie.imdbID} clickHandler={showMovie} />)}</div>} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
