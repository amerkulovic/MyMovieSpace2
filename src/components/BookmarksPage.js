import MovieCard from "./MovieCard";
import notFoundImg from "../images/notfoundimg.png";
import { useEffect, useState } from "react";

const BookmarksPage = () => {
  const storedBookmarks = localStorage.getItem("bookmarks");
  let [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(JSON.parse(storedBookmarks));
  }, []);

  console.warn(bookmarks);

  return (
    <>
      {bookmarks && (
        <div className="flex flex-row justify-center items-center h-[600px]">
          {bookmarks.map((movie) => (
            <MovieCard moviePoster={movie.poster !== "N/A" ? movie.poster : notFoundImg} movieTitle={movie.title} imdbID={movie.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default BookmarksPage;
