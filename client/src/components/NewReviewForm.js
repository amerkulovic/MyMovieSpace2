import { useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";
import { FaStar } from "react-icons/fa";

const NewReviewForm = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  let [username, setUsername] = useState("");
  let [message, setMessage] = useState("");
  let [title, setTitle] = useState("");
  let [rating, setRating] = useState(null);
  let [hover, setHover] = useState(null);
  console.log(rating);

  let { id } = useParams();

  let usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  let messageHandler = (e) => {
    setMessage(e.target.value);
  };
  let titleHandler = (e) => {
    setTitle(e.target.value);
  };

  let ratingHandler = () => {
    setRating();
  };

  let submitHandler = (e) => {
    // e.preventDefault();

    fetch(`/create-review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: message, username: username, movieId: id, movieRating: rating }),
    })
      .then(() => {
        console.log("new review added!");
      })
      .catch((error) => {
        console.error("Error creating review:", error);
      });
  };
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white rounded-lg w-5/6 p-3 my-3 border-2 border-black">
      <button className="w-full" onClick={() => setIsOpen(!isOpen)}>
        <h1 className="text-center text-3xl movie-header">Leave A Review</h1>
      </button>
      {isOpen && (
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="my-4">
            <label className="text-white">Username:</label>
            <input className="w-full rounded-lg p-2 text-black" onChange={usernameHandler} />
          </div>
          <div className="my-4">
            <label className="text-white">Title:</label>
            <input className="w-full rounded-lg p-2 text-black" onChange={titleHandler} />
          </div>
          <div className="my-4">
            <label className="text-white">Message:</label>
            <textarea className="w-full rounded-lg p-2 text-black" onChange={messageHandler} />
          </div>
          <div className="flex justify-center mt-2 mb-4">
            <div className="flex flex-row">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <label>
                    <input type="radio" name="rating" value={currentRating} className="hidden" onClick={() => setRating(currentRating)} />
                    <FaStar size={35} className="cursor-pointer" color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"} onMouseEnter={() => setHover(currentRating)} onMouseLeave={() => setHover(null)} />
                  </label>
                );
              })}
            </div>
          </div>
          <button className="bg-red-900 movie-header text-2xl py-3 rounded-lg mt-2 mb-5">Publish Review</button>
        </form>
      )}
    </div>
  );
};

export default NewReviewForm;
