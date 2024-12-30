import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import notFoundImg from "../images/notfoundimg.png";
import HomeReviewCard from "./HomeReviewCard";
import LoadingSpinner from "./LoadingSpinner";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isWatchedLoading, setIsWatchedLoading] = useState(false);
  const [isBookmarksLoading, setIsBookmarksLoading] = useState(false);
  const [isReviewsLoading, setIsReviwsLoading] = useState(false);
  const [watchedCap, setWatchedCap] = useState(6);
  const [bookmarksCap, setBookmarksCap] = useState(6);
  const [reviewsCap, setReviewsCap] = useState(3);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [error, setError] = useState(null);
  let { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError("Error fetching user data.");
      }
    };

    fetchUserProfile();
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchReviews = async () => {
      setIsReviwsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/user-reviews/${user.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data.reviews.reverse());
      } catch (err) {
        setError(err.message);
      } finally {
        setIsReviwsLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchBookmarks = async () => {
      setIsBookmarksLoading(true);
      try {
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
        setIsBookmarksLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchWatchedMovies = async () => {
      try {
        setIsWatchedLoading(true);
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
        setIsWatchedLoading(false);
      }
    };

    fetchWatchedMovies();
  }, [user]);

  let showMoreHandler = (name, array) => {
    if (name === "watched") {
      setWatchedCap(array.length);
    } else if (name === "bookmarks") {
      setBookmarksCap(array.length);
    } else {
      setReviewsCap(array.length);
    }
  };
  let showLessHandler = (name) => {
    if (name === "watched") {
      setWatchedCap(6);
    } else if (name === "bookmarks") {
      setBookmarksCap(6);
    } else {
      setReviewsCap(3);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2">
      <p className="movie-header text-4xl text-start pt-10 pl-10">Hello {userData.firstName}</p>
      <section className="flex flex-col items-center">
        <h1 className="flex justify-center movie-header text-4xl border-b-[0.5px] border-white w-11/12 mb-4"> Your Watched Movies</h1>
        <section className="flex flex-wrap justify-center">{isWatchedLoading ? <LoadingSpinner /> : watchedMovies.slice(0, watchedCap).map((movie) => <ProfileCard moviePoster={movie.poster !== "N/A" ? movie.poster : notFoundImg} movieTitle={movie.title} imdbID={movie.id} />)}</section>
        {watchedCap < watchedMovies.length && (
          <button className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-1/2 p-3 my-3 border-2 border-black text-center text-xl movie-header" onClick={() => showMoreHandler("watched", watchedMovies)}>
            Show More
          </button>
        )}
        {watchedCap > 6 && (
          <button className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-1/2 p-3 my-3 border-2 border-black text-center text-xl movie-header" onClick={() => showLessHandler("watched")}>
            Show Less
          </button>
        )}
        <h1 className="flex justify-center movie-header text-4xl border-b-[0.5px] border-white w-11/12 mb-4"> Your Bookmarks</h1>
        <section className="flex flex-wrap justify-center">{isBookmarksLoading ? <LoadingSpinner /> : bookmarks.slice(0, bookmarksCap).map((movie) => <ProfileCard moviePoster={movie.poster !== "N/A" ? movie.poster : notFoundImg} movieTitle={movie.title} imdbID={movie.id} />)}</section>
        {bookmarksCap < bookmarks.length && (
          <button className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-1/2 p-3 my-3 border-2 border-black text-center text-xl movie-header" onClick={() => showMoreHandler("bookmarks", watchedMovies)}>
            Show More
          </button>
        )}
        {bookmarksCap > 6 && (
          <button className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-1/2 p-3 my-3 border-2 border-black text-center text-xl movie-header" onClick={() => showLessHandler("bookmarks")}>
            Show Less
          </button>
        )}
        <h1 className="flex justify-center movie-header text-4xl border-b-[0.5px] border-white w-11/12 mb-4"> Your Reviews</h1>
        {isReviewsLoading ? (
          <LoadingSpinner />
        ) : (
          reviews.slice(0, reviewsCap).map((review) => (
            <HomeReviewCard
              key={review._id}
              title={review.title}
              link={review.movieId}
              // date={new Date(review.lastAccessed).toLocaleDateString("en-US", {
              //   year: "numeric",
              //   month: "long",
              //   day: "numeric",
              // })}
              poster={review.poster}
              rating={review.movieRating || 0}
              text={review.description}
              username={review.username}
            />
          ))
        )}
        {reviewsCap < reviews.length && (
          <button className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-1/2 p-3 my-3 border-2 border-black text-center text-xl movie-header" onClick={() => showMoreHandler("reviews", reviews)}>
            Show More
          </button>
        )}
        {reviewsCap > 3 && (
          <button className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-1/2 p-3 my-3 border-2 border-black text-center text-xl movie-header" onClick={() => showLessHandler("reviews")}>
            Show Less
          </button>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
