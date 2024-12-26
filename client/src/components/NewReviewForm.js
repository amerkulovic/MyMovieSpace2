import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewReviewForm = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  let [rating, setRating] = useState(null);
  let [hover, setHover] = useState(null);

  let { id } = useParams();

  const [formData, setFormData] = useState({
    userName: "",
    message: "",
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let submitHandler = (e) => {
    // e.preventDefault();

    fetch(`/create-review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: formData.title, description: formData.message, username: formData.userName, movieId: id, movieRating: rating, poster: props.poster }),
    })
      .then(() => {
        console.log("new review added!");
      })
      .catch((error) => {
        console.error("Error creating review:", error);
      });
  };
  return (
    <div className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-5/6 p-3 my-3 border-2 border-black">
      <div className="flex items-center">
        <FontAwesomeIcon className={`text-2xl hover:cursor-pointer ${!isOpen ? "hidden" : ""}`} icon={faX} onClick={() => setIsOpen(!isOpen)} />
        <button className="w-full" onClick={() => setIsOpen(!isOpen)}>
          <h1 className="text-center text-3xl movie-header">Leave A Review</h1>
        </button>
      </div>
      {isOpen && (
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="my-4">
            <label className="text-white">Username:</label>
            <input className="w-full rounded-lg p-2 text-black" name="userName" value={formData.userName} onChange={handleChange} />
          </div>
          <div className="my-4">
            <label className="text-white">Title:</label>
            <input className="w-full rounded-lg p-2 text-black" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="my-4">
            <label className="text-white">Message:</label>
            <textarea className="w-full rounded-lg p-2 text-black" name="message" value={formData.message} onChange={handleChange} />
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
          <button className="border border-white bg-red-900 movie-header text-2xl py-3 rounded-lg mt-2 mb-5">Publish Review</button>
        </form>
      )}
    </div>
  );
};

export default NewReviewForm;
