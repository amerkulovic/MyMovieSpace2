import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Body from "./pages/Body";
import Footer from "./components/Footer/Footer";
import MovieCard from "./components/MovieCard";
import notFoundImg from "./images/notfoundimg.png";
import MoviePage from "./components/MoviePage";
import HomePage from "./components/HomePage";

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
        localStorage.setItem("movies", JSON.stringify(movieData));
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
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<div className="flex flex-wrap justify-center">{movies && movies.Search.map((movie) => <MovieCard moviePoster={movie.Poster !== "N/A" ? movie.Poster : notFoundImg} movieTitle={movie.Title} imdbID={movie.imdbID} clickHandler={showMovie} />)}</div>} />
            <Route path="/search/:id" element={<MoviePage />} />
          </Routes>
        </div>
        <Footer />
      </>
    </Router>
  );
}

export default App;
