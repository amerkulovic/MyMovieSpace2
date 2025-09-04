import { useEffect, useState } from "react";
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
    <div className="p-4 py-10 bg-gradient-to-b from-black via-gray-950 to-black min-h-screen">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/70">
          <section className="relative flex flex-col items-center bg-gray-900/90 rounded-2xl shadow-xl p-6 w-[90%] max-w-2xl border border-gray-700">
            <h1 className="text-2xl font-bold text-white mb-4">Select your profile photo</h1>
            <div className="flex flex-wrap justify-center gap-4">
              {photoOptions.map((photo) => (
                <span key={photo} onClick={() => setSelectedPhoto(photo)} className={`cursor-pointer rounded-xl overflow-hidden border-2 ${selectedPhoto === photo ? "border-red-500" : "border-transparent"} hover:scale-105 transition`}>
                  <img src={photo} alt="profile option" className="w-[100px] h-[100px] object-cover" />
                </span>
              ))}
            </div>
            <div className="w-full flex justify-end mt-6 gap-3">
              <button className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition" onClick={closeModalHandler}>
                Cancel
              </button>
              <button disabled={!selectedPhoto} onClick={confirmPhotoHandler} className={`px-4 py-2 rounded-lg transition ${selectedPhoto ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}>
                Confirm
              </button>
            </div>
          </section>
        </div>
      )}
      <section className="flex flex-col items-center w-[95%] max-w-5xl mx-auto">
        <section className="flex flex-col md:flex-row items-center justify-between bg-gray-900/80 border border-gray-700 rounded-2xl p-6 w-full shadow-lg">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img src={profilePhoto ? profilePhoto : defaultPhoto} className="w-[160px] h-[160px] rounded-full border-4 border-red-600 object-cover shadow-md" />
              <button onClick={() => setIsModalOpen(true)} className="absolute bottom-2 right-2 bg-red-600 hover:bg-red-700 transition rounded-full p-2 text-white shadow">
                {!profilePhoto ? "+" : <FontAwesomeIcon icon={faPen} className="h-4" />}
              </button>
            </div>
            <h1 className="text-4xl font-bold text-white">{userData.username}</h1>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 mt-6 md:mt-0">
            <div className="text-center">
              <p className="text-gray-400">Reviews</p>
              <p className="text-2xl font-bold text-white">{reviews.length}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Bookmarks</p>
              <p className="text-2xl font-bold text-white">{bookmarks.length}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Watched</p>
              <p className="text-2xl font-bold text-white">{watchedMovies.length}</p>
            </div>
          </div>
        </section>
        {[
          {
            title: "Your Watched Movies",
            isOpen: isWatchedOpen,
            toggle: () => setIsWatchedOpen(!isWatchedOpen),
            data: watchedMovies,
            cap: watchedCap,
            loading: isWatchedLoading,
            showMore: () => showMoreHandler("watched", watchedMovies),
            showLess: () => showLessHandler("watched"),
            Card: (movie: any) => <ProfileCard moviePoster={movie.poster !== "N/A" ? movie.poster : notFoundImg} movieTitle={movie.title} imdbID={movie.id} />,
          },
          {
            title: "Your Bookmarks",
            isOpen: isBookmarksOpen,
            toggle: () => setIsBookmarksOpen(!isBookmarksOpen),
            data: bookmarks,
            cap: bookmarksCap,
            loading: isBookmarksLoading,
            showMore: () => showMoreHandler("bookmarks", bookmarks),
            showLess: () => showLessHandler("bookmarks"),
            Card: (movie: any) => <ProfileCard moviePoster={movie.poster} movieTitle={movie.title} imdbID={movie.id} />,
          },
          {
            title: "Your Reviews",
            isOpen: isReviewsOpen,
            toggle: () => setIsReviewsOpen(!isReviewsOpen),
            data: reviews,
            cap: reviewsCap,
            loading: isReviewsLoading,
            showMore: () => showMoreHandler("reviews", reviews),
            showLess: () => showLessHandler("reviews"),
            Card: (review: any) => <HomeReviewCard key={review._id} title={review.title} link={review.movieId} poster={review.poster} rating={review.movieRating || 0} text={review.description} username={review.username} profilePhoto={review.profilePhoto} />,
          },
        ].map((section, idx) => (
          <div key={idx} className="w-full mt-6">
            <div className="flex items-center justify-between bg-gray-800/80 hover:bg-gray-700/80 transition rounded-xl p-4 cursor-pointer shadow" onClick={section.toggle}>
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <FontAwesomeIcon icon={section.isOpen ? faAngleDown : faAngleRight} className="text-white text-xl" />
            </div>
            {section.isOpen && (
              <div className="mt-4">
                <section className="flex flex-wrap justify-center gap-4">{section.loading ? <LoadingSpinner /> : section.data.length > 0 ? section.data.slice(0, section.cap).map(section.Card) : <p className="text-gray-400 text-lg py-6">No data available</p>}</section>
                <section className="flex justify-center">
                  {section.cap < section.data.length && (
                    <button className="mt-4 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow transition" onClick={section.showMore}>
                      Show More
                    </button>
                  )}
                  {section.cap > 6 && (
                    <button className="mt-2 px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white shadow transition" onClick={section.showLess}>
                      Show Less
                    </button>
                  )}
                </section>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProfilePage;
