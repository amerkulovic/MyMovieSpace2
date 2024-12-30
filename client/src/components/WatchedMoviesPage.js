import MovieCard from "./MovieCard";
import notFoundImg from "../images/notfoundimg.png";
import LoadingPage from "./LoadingPage";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const WatchedMoviesPage = () => {
  const [error, setError] = useState(null);
  let [watchedMovies, setWatchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchWatchedMovies = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`/user-watched/${user.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch watched movies");
        }

        const data = await response.json();
        setWatchedMovies(data.watched.reverse());
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchedMovies();
  }, [user]);

  if (isLoading) {
    return <LoadingPage />;
  }

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
