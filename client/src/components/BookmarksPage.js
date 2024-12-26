import MovieCard from "./MovieCard";
import notFoundImg from "../images/notfoundimg.png";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";

const BookmarksPage = () => {
  const storedBookmarks = localStorage.getItem("bookmarks");
  let [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
      setIsLoading(false);
    } else {
      setBookmarks([]);
      setIsLoading(false);
    }
  }, []);

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
        <h1 className="movie-header text-6xl flex justify-center items-center h-[600px]">Find Your Favorite Movies!</h1>
      )}
    </>
  );
};

export default BookmarksPage;
