import React, { useEffect, useState, useRef } from "react";
import defaultPhoto from "../images/default.jpg";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import notFoundImg from "../images/notfoundimg.png";
import HomeReviewCard from "./HomeReviewCard";
import LoadingSpinner from "./LoadingSpinner";
import LoadingPage from "./LoadingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

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
  const [profilePhoto, setProfilePhoto] = useState(null);
  let { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
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
        setProfilePhoto(data.profilePhoto);
      } catch (error) {
        setError("Error fetching user data.");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [user, navigate, profilePhoto]);

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

  const addPhotoHandler = (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    if (!file) {
      console.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", file);
    formData.append("username", user.username);

    fetch(`/upload-profile-photo`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setProfilePhoto(data.profilePhoto);
        updateUser({ ...user, profilePhoto: data.profilePhoto });
        console.log("Photo uploaded successfully:", data);
      })
      .catch((error) => {
        console.error("Error uploading photo:", error);
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <LoadingPage />;
  }

  return (
    <div className="p-2 py-10">
      <section className="flex flex-col items-center">
        <section className="flex w-[90%] items-center justify-between py-10 max-md:flex-col bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-lg px-5">
          <section className="flex items-center">
            <span className="photo-container flex items-center relative max-md:flex-col max-md:justify-center">
              <img src={profilePhoto ? profilePhoto : defaultPhoto} className="w-[180px] h-[180px] min-w-[180px] max-md:border-2 max-md:border-black" />
              {/* <input className="hidden" ref={fileInputRef} type="file" accept="image/*" id="file-input" onChange={addPhotoHandler} />
              <label htmlFor="file-input">
                <button className={`${!profilePhoto ? "bg-red-900 top-1 right-2" : "bg-gray-800 bottom-1 right-1 "} font-bold absolute  py-[5px] px-[13px] rounded-full text-white text-xl max-md:bottom-[4.5rem] max-md:right-2`} onClick={() => fileInputRef.current.click()}>
                  {!profilePhoto ? "+" : <FontAwesomeIcon icon={faPen} className="h-4" />}
                </button>
              </label> */}
              <h1 className="movie-header text-white text-4xl pl-5 max-md:my-4">{userData.username}</h1>
            </span>
          </section>
          <div className="flex max-lg:flex-col max-md:items-center">
            <section className="flex mx-5 max-md:my-1">
              <h1 className="movie-header text-white mr-1">Reviews: </h1>
              <h1 className="movie-header text-white">{reviews.length}</h1>
            </section>
            <section className="flex mx-5 max-md:my-1">
              <h1 className="movie-header text-white mr-1">Bookmarks: </h1>
              <h1 className="movie-header text-white">{bookmarks.length}</h1>
            </section>
            <section className="flex mx-5 max-md:my-1">
              <h1 className="movie-header text-white mr-1">Watched Movies: </h1>
              <h1 className="movie-header text-white">{watchedMovies.length}</h1>
            </section>
          </div>
        </section>
        <h1 className="flex justify-center movie-header text-4xl border-b-[0.5px] border-white w-11/12 mb-4 pt-10"> Your Watched Movies</h1>
        <section className="flex flex-wrap justify-center">{isWatchedLoading ? <LoadingSpinner /> : watchedMovies.slice(0, watchedCap).map((movie) => <ProfileCard moviePoster={movie.poster !== "N/A" ? movie.poster : notFoundImg} movieTitle={movie.title} imdbID={movie.id} />)}</section>
        {watchedMovies.length === 0 && <p className="movie-header text-xl py-10">No watched movies</p>}
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
        {bookmarks.length === 0 && <p className="movie-header text-xl py-10">No bookmark</p>}
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
              profilePhoto={review.profilePhoto}
            />
          ))
        )}
        {reviews.length === 0 && <p className="movie-header text-xl py-10">No reviews</p>}
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
