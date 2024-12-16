import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Body from "./pages/Body";
import Footer from "./components/Footer/Footer";
import MovieCard from "./components/MovieCard";
import notFoundImg from "./images/notfoundimg.png";
import MoviePage from "./components/MoviePage";
import HomePage from "./components/HomePage";
import CreateAccountPage from "./components/CreateAccountPage";
import LoadingPage from "./components/LoadingPage";
import SignInPage from "./components/SignInPage";
import BookmarksPage from "./components/BookmarksPage";
import HamburgerMenu from "./components/HamburgerMenu";
import WatchedMoviesPage from "./components/WatchedMoviesPage";

function App() {
  let [movies, setMovies] = useState(null);
  let [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const valueHandler = (event) => {
    setName(event.target.value);
  };

  const searchHandler = async () => {
    await fetch(`https://www.omdbapi.com/?apikey=f14ca85d&s=${name}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        if (isOpen) toggleMenu();
      });
  };

  return (
    <Router>
      <>
        <Nav search={searchHandler} value={valueHandler} toggleMenu={toggleMenu} isOpen={isOpen} />
        {isOpen && <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} search={searchHandler} value={valueHandler} />}
        <div className="background-image">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<div className="flex flex-wrap justify-center">{movies ? movies.Search.map((movie) => <MovieCard moviePoster={movie.Poster !== "N/A" ? movie.Poster : notFoundImg} movieTitle={movie.Title} imdbID={movie.imdbID} />) : <LoadingPage />}</div>} />
            <Route path="/:search/:id" element={<MoviePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/watched-movies" element={<WatchedMoviesPage />} />
            <Route path="/signup" element={<CreateAccountPage />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </div>
        <Footer />
      </>
    </Router>
  );
}

export default App;
