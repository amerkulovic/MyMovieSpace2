import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/AuthContext";
import "./App.css";
import axios from "axios";
import BookmarksPage from "./components/BookmarksPage";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer/Footer";
import HamburgerMenu from "./components/HamburgerMenu";
import HomePage from "./components/HomePage";
import LoadingPage from "./components/LoadingPage";
import Login from "./components/Login";
import MessagesPage from "./components/MessagesPage";
import MovieCard from "./components/MovieCard";
import MoviePage from "./components/MoviePage";
import Nav from "./components/Nav";
import PostPage from "./components/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import SignUp from "./components/SignUp";
import WatchedMoviesPage from "./components/WatchedMoviesPage";
import notFoundImg from "./images/notfoundimg.png";
import ProfilePage from "./components/ProfilePage";

function App() {
  let { logout } = useAuth();
  let [movies, setMovies] = useState(null);
  let [name, setName] = useState("");
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const valueHandler = (event) => {
    setName(event.target.value);
  };

  const searchHandler = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=f14ca85d&s=${name}`);
      const data = await response.json();

      if (data.Response === "False" || !data.Search) {
        setMovies([{ title: "No movies found", isError: true }]);
      } else {
        setMovies(data.Search);
      }

      if (isOpen) toggleMenu();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Router>
      <>
        <ScrollToTop />
        <Nav isLoggedIn={isLoggedIn} logoutHandler={logout} search={searchHandler} value={valueHandler} toggleMenu={toggleMenu} isOpen={isOpen} />
        {isOpen && <HamburgerMenu isLoggedIn={isLoggedIn} logoutHandler={logout} isOpen={isOpen} toggleMenu={toggleMenu} search={searchHandler} value={valueHandler} />}
        <div className="background-image">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<div className="flex flex-wrap justify-center">{movies ? movies[0]?.isError ? <ErrorPage /> : movies.map((movie) => <MovieCard key={movie.imdbID} moviePoster={movie.Poster !== "N/A" ? movie.Poster : notFoundImg} movieTitle={movie.Title} imdbID={movie.imdbID} />) : <LoadingPage />}</div>} />
            <Route path="/:search/:id" element={<MoviePage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/message/:id" element={<PostPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/watched-movies" element={<WatchedMoviesPage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={localStorage.getItem("token") ? <ProfilePage /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </>
    </Router>
  );
}

export default App;
