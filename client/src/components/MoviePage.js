import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AOS from "aos";
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
  let { user, isLoggedIn } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

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
    showMovie();
  }, [id]);

  useEffect(() => {
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i] === id) setBookmarkStyling("text-4xl mt-3 text-yellow-400");
    }
    for (let i = 0; i < watchedMovies.length; i++) {
      if (watchedMovies[i] === id) setWatchedStyling("text-4xl ml-2 mt-3 text-blue-400");
    }
  });

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`/user-bookmarks/${user.username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookmarks");
        }

        const data = await response.json();
        setBookmarks(data.bookmarks.map((bookmark) => bookmark.id));
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchBookmarks();
  }, [user]);

  useEffect(() => {
    const fetchWatched = async () => {
      try {
        const response = await fetch(`/user-watched/${user.username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookmarks");
        }

        const data = await response.json();
        setWatchedMovies(data.watched.map((movie) => movie.id));
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchWatched();
  }, [user]);

  const toggleBookmark = async (movie) => {
    try {
      const response = await fetch(`/create-bookmark/${user.username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to toggle bookmark");
      }
      const data = await response.json();
      const isBookmarked = data.bookmarked;
      setBookmarkStyling(isBookmarked ? "text-4xl mt-3 text-yellow-400" : "text-4xl mt-3 text-white");
      setBookmarks((prevBookmarkedMovies) => (data.bookmarked ? [...prevBookmarkedMovies, movie.id] : prevBookmarkedMovies.filter((id) => id !== movie.id)));
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleWatched = async (movie) => {
    try {
      const response = await fetch(`/create-watched/${user.username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to toggle bookmark");
      }
      const data = await response.json();
      const isWatched = data.hasWatched;
      setWatchedStyling(isWatched ? "text-4xl mt-3 text-blue-400 ml-2 " : "text-4xl mt-3 text-white ml-2 ");
      setWatchedMovies((prevWatchedMovies) => (data.hasWatched ? [...prevWatchedMovies, movie.id] : prevWatchedMovies.filter((id) => id !== movie.id)));
    } catch (err) {
      console.error(err.message);
    }
  };

  const showMovie = async () => {
    await fetch(`https://www.omdbapi.com/?i=${id}&apikey=f14ca85d`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setMovie(data);
      });
  };

  const showMoreHandler = () => {
    setReviewCap(filteredReviews.length);
  };

  const showLessHandler = () => {
    setReviewCap(3);
  };

  const filteredReviews = reviews.filter((review) => review.movieId === id).reverse();

  const addNewReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  let averageReview = filteredReviews.reduce((currNumber, review) => {
    return currNumber + review.movieRating / filteredReviews.length;
  }, 0);

  return (
    <>
      {!movie ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col overflow-hidden">
          <div className="flex flex-row flex-wrap justify-center">
            <div data-aos="fade-right" className="mr-5 my-10 max-xl:mr-0 max-sm:flex max-sm:justify-center max-sm:w-8/12">
              <img src={movie.Poster !== "N/A" ? movie.Poster : notFoundImg} className="h-[500px] max-sm:h-[400px] w-96" />
            </div>
            <div data-aos="fade-left" className="text-white mt-10 max-xl:w-1/2 max-xl:ml-5 max-md:ml-0 max-md:bg-gradient-to-r from-red-900 via-red-600 to-red-900 w-3/5 max-md:p-5 max-md:rounded-lg max-md:mt-0 max-md:mb-3 max-md:w-11/12">
              <section className="border-b-[0.5px] border-white mb-5">
                <h1 className="movie-header text-5xl w-full max-sm:text-3xl">{movie.Title}</h1>
                <p>{`${movie.Year} ${movie.Director !== "N/A" ? `directed by ${movie.Director}` : ""}`}</p>
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
              {isLoggedIn ? (
                <>
                  <button onClick={() => toggleBookmark({ id: movie.imdbID, title: movie.Title, poster: movie.Poster })}>
                    <FontAwesomeIcon icon={faBookmark} className={bookmarkStyling} />
                  </button>
                  <button
                    onClick={() => {
                      toggleWatched({ id: movie.imdbID, title: movie.Title, poster: movie.Poster });
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} className={watchedStyling} />
                  </button>
                </>
              ) : (
                ""
              )}
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
                    date={
                      !review.lastAccessed
                        ? "Just now"
                        : new Date(review.lastAccessed).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                    }
                    rating={review.movieRating || 0}
                    text={review.description}
                    username={review.username}
                    profilePhoto={review.profilePhoto}
                  />
                ))}
                {reviewCap < filteredReviews.length && (
                  <button onClick={showMoreHandler} className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-5/6 max-sm:w-11/12  p-3 my-3 border-2 border-black text-center text-xl movie-header">
                    Show more
                  </button>
                )}
                {reviewCap === filteredReviews.length && filteredReviews.length > 3 && (
                  <button onClick={showLessHandler} className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-5/6 max-sm:w-11/12  p-3 my-3 border-2 border-black text-center text-xl movie-header">
                    Show less
                  </button>
                )}
              </>
            ) : (
              <h1 className="movie-header text-4xl text-center max-md:text-3xl max-xsm:text-2xl mt-10">Be the first to write a review!</h1>
            )}
            {isLoggedIn ? (
              <NewReviewForm poster={movie.Poster} id={id} addNewReview={addNewReview} />
            ) : (
              <div className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-3/4 max-sm:w-11/12  p-3 my-3 border-2 border-black">
                <a href="/login">
                  <h1 className="text-center text-3xl movie-header">Login to add to the discussion!</h1>
                </a>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default MoviePage;
