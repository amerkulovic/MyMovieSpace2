import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  let { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not logged in
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
    if (!user) return; // Prevent fetch if user is not logged in
    console.log(user.username);
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
        setReviews(data.reviews);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {userData.username}</p>
      <ul>
        {reviews.map((review) => (
          <>
            <ReviewCard
              key={review._id}
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
          </>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
