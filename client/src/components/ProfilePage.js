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
import { faPen, faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isWatchedLoading, setIsWatchedLoading] = useState(false);
  const [isWatchedOpen, setIsWatchedOpen] = useState(true);
  const [isBookmarksLoading, setIsBookmarksLoading] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(true);
  const [isReviewsLoading, setIsReviwsLoading] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(true);
  const [watchedCap, setWatchedCap] = useState(6);
  const [bookmarksCap, setBookmarksCap] = useState(6);
  const [reviewsCap, setReviewsCap] = useState(3);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoOptions, setPhotoOptions] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoUpdateKey, setPhotoUpdateKey] = useState(0);
  let { user, updateUser } = useAuth();
  const navigate = useNavigate();

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
  }, [user, navigate, photoUpdateKey]);

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

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/profile-photos/list");
        if (!response.ok) throw new Error("Failed to fetch photos");

        const { photos } = await response.json();
        setPhotoOptions([...photos]);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

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

  const confirmPhotoHandler = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    try {
      const response = await fetch("/upload-profile-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image: selectedPhoto }),
      });

      if (response.ok) {
        console.log("Profile photo updated successfully!");
        setIsModalOpen(false);
        updateUser({ profilePhoto: selectedPhoto });
        setPhotoUpdateKey((prev) => prev + 1);
      } else {
        console.error("Photo upload failed.");
      }
    } catch (err) {
      console.error("Error uploading photo:", err);
    }
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setSelectedPhoto("");
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <LoadingPage />;
  }

  return (
    <div className="p-2 py-10">
      {isModalOpen && (
        <div className="backdrop">
          <section className="modal relative flex flex-col items-center bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-lg p-5 w-[75%]">
            <h1 className="movie-header text-2xl text-center">Select your profile photo</h1>
            <div className="flex flex-row justify-around p-5">
              {photoOptions.map((photo) => (
                <span key={photo} onClick={() => setSelectedPhoto(photo)} className={`photo-selector-container flex items-center max-md:flex-col max-md:justify-center cursor-pointer mx-4 max-sm:mx-2`}>
                  <img className={`w-[100px] h-[100px] min-w-[100px] ${selectedPhoto === photo ? "border-2 border-green-400" : ""}`} src={photo} alt="profile option" />
                </span>
              ))}
            </div>
            <div className="w-full flex justify-end">
              <button className="bg-gray-500 rounded-lg px-3 py-2 mt-2 border-2 border-black text-center text-xl movie-header mr-2" onClick={closeModalHandler}>
                Cancel
              </button>
              <button disabled={!selectedPhoto} onClick={confirmPhotoHandler} className={`${selectedPhoto ? "bg-red-900" : "bg-gray-500"} rounded-lg px-3 py-2 mt-2 border-2 border-black text-center text-xl movie-header`}>
                Confirm
              </button>
            </div>
          </section>
        </div>
      )}
      <section className="flex flex-col items-center">
        <section className="flex w-[90%] items-center justify-between py-10 max-md:flex-col bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-lg px-5">
          <section className="flex items-center">
            <span className="photo-container flex items-center relative max-md:flex-col max-md:justify-center">
              <img src={profilePhoto ? profilePhoto : defaultPhoto} className="w-[180px] h-[180px] min-w-[180px] max-md:border-2 max-md:border-black" />
              <button className={`${!profilePhoto ? "bg-red-900 top-1 right-2" : "bg-gray-800 bottom-1 right-1 "} font-bold absolute  py-[5px] px-[13px] rounded-full text-white text-xl max-md:bottom-[4.5rem] max-md:right-2`} onClick={() => setIsModalOpen(true)}>
                {!profilePhoto ? "+" : <FontAwesomeIcon icon={faPen} className="h-4" />}
              </button>
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
        <div className="flex items-center justify-center relative border-b-[0.5px] border-white bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 my-4 rounded-lg w-[90%]">
          <FontAwesomeIcon className="absolute left-6 top-[33%] text-3xl cursor-pointer text-white hover:text-red-500" icon={isWatchedOpen ? faAngleDown : faAngleRight} onClick={() => setIsWatchedOpen(!isWatchedOpen)} />
          <h1 className="flex justify-center movie-header text-4xl py-5"> Your Watched Movies</h1>
        </div>
        {isWatchedOpen && (
          <>
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
            {watchedMovies.length === 0 && <p className="movie-header text-xl py-10">No watched movies</p>}
          </>
        )}
        <div className="flex items-center justify-center relative border-b-[0.5px] border-white bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 rounded-lg w-[90%]">
          <FontAwesomeIcon className="absolute left-6 top-[33%] text-3xl cursor-pointer text-white hover:text-red-500" icon={isBookmarksOpen ? faAngleDown : faAngleRight} onClick={() => setIsBookmarksOpen(!isBookmarksOpen)} />
          <h1 className="flex justify-center movie-header text-4xl py-5"> Your Bookmarks</h1>
        </div>
        {isBookmarksOpen && (
          <>
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
          </>
        )}
        <div className="flex items-center justify-center relative border-b-[0.5px] border-white bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 my-4 rounded-lg w-[90%]">
          <FontAwesomeIcon className="absolute left-6 top-[33%] text-3xl cursor-pointer text-white hover:text-red-500" icon={isReviewsOpen ? faAngleDown : faAngleRight} onClick={() => setIsReviewsOpen(!isReviewsOpen)} />
          <h1 className="flex justify-center movie-header text-4xl py-5"> Your Reviews</h1>
        </div>
        {isReviewsOpen && (
          <>
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
          </>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
