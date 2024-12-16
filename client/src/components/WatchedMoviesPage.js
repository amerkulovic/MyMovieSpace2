import MovieCard from "./MovieCard";
import notFoundImg from "../images/notfoundimg.png";
import { useEffect, useState } from "react";

const WatchedMoviesPage = () => {
  const storedMovies = localStorage.getItem("watched");
  let [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    if (storedMovies) {
      setWatchedMovies(JSON.parse(storedMovies));
    } else {
      setWatchedMovies([]);
    }
  }, []);

  return (
    <>
      {watchedMovies.length !== 0 ? (
        <div>
          <h1 className="movie-header text-4xl text-center pt-10">Movies you've seen!</h1>
          <div className="flex flex-wrap justify-center items-center h-full">
            {watchedMovies.map((movie) => (
              <MovieCard moviePoster={movie.poster !== "N/A" ? movie.poster : notFoundImg} movieTitle={movie.title} imdbID={movie.id} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="movie-header text-6xl flex text-center justify-center items-center h-[600px]">Find movies you've watched!</h1>
      )}
    </>
  );
};

export default WatchedMoviesPage;
