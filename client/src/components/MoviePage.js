import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faBookmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import notFoundImg from "./../images/notfoundimg.png";
import LoadingPage from "./LoadingPage";
import ReviewCard from "./ReviewCard";
import NewReviewForm from "./NewReviewForm";
import { FaStar } from "react-icons/fa";

const MoviePage = () => {
  let [movie, setMovie] = useState(null);
  let [bookmarks, setBookmarks] = useState([]);
  let [watchedMovies, setWatchedMovies] = useState([]);
  let [reviewCap, setReviewCap] = useState(3);
  let [bookmarkStyling, setBookmarkStyling] = useState("text-4xl mt-3");
  let [watchedStyling, setWatchedStyling] = useState("text-4xl mt-3 ml-2");
  let [reviews, setReviews] = useState([]);
  let { id } = useParams();

  console.log(movie);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/all-reviews");
        const reviews = await response.json();
        setReviews(reviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    const storedWatchedMovies = localStorage.getItem("watched");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
    if (storedWatchedMovies) {
      setWatchedMovies(JSON.parse(storedWatchedMovies));
    }
    showMovie();
  }, []);

  useEffect(() => {
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].id === id) setBookmarkStyling("text-4xl mt-3 text-yellow-400");
    }
    for (let i = 0; i < watchedMovies.length; i++) {
      if (watchedMovies[i].id === id) setWatchedStyling("text-4xl ml-2 mt-3 text-blue-400");
    }
  });

  const showMovie = async () => {
    await fetch(`https://www.omdbapi.com/?i=${id}&apikey=f14ca85d`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setMovie(data);
      });
  };

  const bookmarkHandler = (newBookmark) => {
    const updatedBookmarks = [...bookmarks];

    const existingBookmarkIndex = updatedBookmarks.findIndex((bookmark) => bookmark.id === newBookmark.id);

    if (existingBookmarkIndex !== -1) {
      updatedBookmarks.splice(existingBookmarkIndex, 1);
      setBookmarkStyling("text-4xl mt-3 text-white");
    } else {
      updatedBookmarks.push(newBookmark);
      setBookmarkStyling("text-4xl mt-3 text-yellow-400");
    }

    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  const watchedMoviesHandler = (newMovie) => {
    const updatedMovies = [...watchedMovies];

    const existingMovieIndex = updatedMovies.findIndex((movie) => movie.id === newMovie.id);

    if (existingMovieIndex !== -1) {
      updatedMovies.splice(existingMovieIndex, 1);
      setWatchedStyling("text-4xl ml-2 mt-3 text-white");
    } else {
      updatedMovies.push(newMovie);
      setWatchedStyling("text-4xl ml-2 mt-3 text-blue-400");
    }

    setWatchedMovies(updatedMovies);
    localStorage.setItem("watched", JSON.stringify(updatedMovies));
  };

  const showMoreHandler = () => {
    setReviewCap(filteredReviews.length);
  };

  const showLessHandler = () => {
    setReviewCap(3);
  };

  const filteredReviews = reviews.filter((review) => review.movieId === id).reverse();

  let averageReview = filteredReviews.reduce((currNumber, review) => {
    return currNumber + review.movieRating / filteredReviews.length;
  }, 0);

  return (
    <>
      {!movie ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap justify-center">
            <div className="mr-5 my-10 max-xl:mr-0 max-sm:w-2/3">
              <img src={movie.Poster !== "N/A" ? movie.Poster : notFoundImg} className="h-[500px] max-sm:h-[400px] w-96" />
            </div>
            <div className="text-white mt-10 max-xl:w-1/2 max-xl:ml-5 max-md:ml-0 max-md:bg-gradient-to-r from-red-900 via-red-600 to-red-900 w-3/5 max-md:p-5 max-md:rounded-lg max-md:mt-0 max-md:mb-3 max-md:w-10/12">
              <section className="border-b-[0.5px] border-white mb-5">
                <h1 className="movie-header text-5xl w-full">{movie.Title}</h1>
                <p>
                  {movie.Year} directed by {movie.Director}
                </p>
              </section>
              <p className="w-[750px] max-xl:w-full mt-4">{movie.Plot}</p>
              <section>
                <h2 className="movie-header text-xl mt-5 mb-5 border-b-[0.5px] border-white">Notable Actors</h2>
                <p>{movie.Actors}</p>
              </section>
              <section>
                <h2 className="movie-header text-xl mt-5 mb-5 border-b-[0.5px] border-white">Reviews</h2>
                {movie.Ratings.map((rating, i) => (
                  <p key={i}>
                    {rating.Source} {rating.Value}
                  </p>
                ))}
                <p className="flex flex-row items-center">
                  MyMovieSpace{" "}
                  {averageReview <= 0 ? (
                    "N/A"
                  ) : (
                    <>
                      {averageReview.toFixed(1)}
                      <FaStar size={15} className="text-yellow-500 ml-1" />
                    </>
                  )}
                </p>
              </section>
              <button
                onClick={() => {
                  bookmarkHandler({ id: movie.imdbID, title: movie.Title, poster: movie.Poster });
                }}
              >
                <FontAwesomeIcon icon={faBookmark} className={bookmarkStyling} />
              </button>
              <button
                onClick={() => {
                  watchedMoviesHandler({ id: movie.imdbID, title: movie.Title, poster: movie.Poster });
                }}
              >
                <FontAwesomeIcon icon={faEye} className={watchedStyling} />
              </button>
            </div>
          </div>
          <section className="pb-10 flex flex-col items-center bg-gradient-to-b from-transparent from-10%  via-black/[.80] via-20% to-black/[.90] to-100% overflow-hidden bg-opacity-70">
            {filteredReviews.length !== 0 ? (
              <>
                <h1 className="flex justify-center movie-header text-4xl border-b-[0.5px] border-white w-[900px] mb-4">Reviews</h1>
                {filteredReviews.slice(0, reviewCap).map((review, index) => (
                  <ReviewCard
                    key={index}
                    title={review.title}
                    date={new Date(review.lastAccessed).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    rating={review.movieRating || 0}
                    text={review.description}
                    username={review.username}
                  />
                ))}
                {reviewCap < filteredReviews.length && (
                  <button onClick={showMoreHandler} className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white rounded-lg w-5/6 p-3 my-3 border-2 border-black text-center text-xl movie-header">
                    Show more
                  </button>
                )}
                {reviewCap === filteredReviews.length && (
                  <button onClick={showLessHandler} className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white rounded-lg w-5/6 p-3 my-3 border-2 border-black text-center text-xl movie-header">
                    Show less
                  </button>
                )}
              </>
            ) : (
              <h1 className="movie-header text-4xl text-center max-md:text-3xl max-xsm:text-2xl mt-10">Be the first to write a review!</h1>
            )}
            <NewReviewForm poster={movie.Poster} />
          </section>
        </div>
      )}
    </>
  );
};

export default MoviePage;
