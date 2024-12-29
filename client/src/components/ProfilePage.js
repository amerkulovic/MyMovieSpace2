import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import MovieCard from "./MovieCard";
import notFoundImg from "../images/notfoundimg.png";
import HomeReviewCard from "./HomeReviewCard";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
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
      }
    };

    fetchReviews();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchBookmarks = async () => {
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
        setBookmarks(data.bookmarks);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBookmarks();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchWatchedMovies = async () => {
      try {
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
        setWatchedMovies(data.watched);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWatchedMovies();
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2">
      <p className="movie-header text-2xl text-center">Hello {userData.firstName}</p>
      <section className="flex flex-col items-center">
        <h1 className="flex justify-center movie-header text-4xl border-b-[0.5px] border-white w-11/12 mb-4"> Your Watched Movies</h1>
        <section className="flex flex-wrap justify-center">
          {watchedMovies.map((movie) => (
            <MovieCard moviePoster={movie.poster !== "N/A" ? movie.poster : notFoundImg} movieTitle={movie.title} imdbID={movie.id} />
          ))}
        </section>
        <h1 className="flex justify-center movie-header text-4xl border-b-[0.5px] border-white w-11/12 mb-4"> Your Bookmarks</h1>
        <section className="flex flex-wrap justify-center">
          {bookmarks.map((movie) => (
            <MovieCard moviePoster={movie.poster !== "N/A" ? movie.poster : notFoundImg} movieTitle={movie.title} imdbID={movie.id} />
          ))}
        </section>
        <h1 className="flex justify-center movie-header text-4xl border-b-[0.5px] border-white w-11/12 mb-4"> Your Reviews</h1>
        {reviews.map((review) => (
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
        ))}
      </section>
    </div>
  );
};

export default ProfilePage;
