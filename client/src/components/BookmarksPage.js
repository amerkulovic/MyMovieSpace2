import MovieCard from "./MovieCard";
import notFoundImg from "../images/notfoundimg.png";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import LoadingPage from "./LoadingPage";

const BookmarksPage = () => {
  const [error, setError] = useState(null);
  let [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchBookmarks = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`/user-bookmarks/${user.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookmarks");
        }

        const data = await response.json();
        setBookmarks(data.bookmarks.reverse());
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      {bookmarks.length !== 0 ? (
        <div>
          <h1 className="movie-header text-4xl text-center pt-10">Your Bookmarks!</h1>
          <div className="flex flex-wrap justify-center items-center h-full">
            {bookmarks.map((movie) => (
              <MovieCard moviePoster={movie.poster !== "N/A" ? movie.poster : notFoundImg} movieTitle={movie.title} imdbID={movie.id} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="movie-header text-6xl flex text-center justify-center items-center h-[600px]">Find Your Favorite Movies!</h1>
      )}
    </>
  );
};

export default BookmarksPage;
