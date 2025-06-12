import { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./AuthContext";

const CommentForm = ({ id, addNewComment }) => {
  let [isOpen, setIsOpen] = useState(false);
  let { user } = useAuth();

  const [formData, setFormData] = useState({
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let submitHandler = (e) => {
    e.preventDefault();

    const comment = {
      description: formData.message,
      username: user.username,
    };
    fetch(`/message/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }
        return response.json();
      })
      .then((updatedMessage) => {
        addNewComment(comment);
        setIsOpen(false);
        setFormData({ message: "" });
      })
      .catch((error) => console.error("Error creating comment:", error));
  };

  return (
    <div className={`bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg ${!isOpen ? "w-3/4" : "w-full"} p-3 my-3 border-2 border-black`}>
      <div className="flex items-center">
        <FontAwesomeIcon className={`text-2xl hover:cursor-pointer ${!isOpen ? "hidden" : ""}`} icon={faX} onClick={() => setIsOpen(!isOpen)} />
        <button className="w-full" onClick={() => setIsOpen(!isOpen)}>
          <h1 className="text-center text-3xl movie-header">Leave A Comment</h1>
        </button>
      </div>
      {isOpen && (
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="my-4">
            <label className="text-white">Message:</label>
            <textarea className="w-full rounded-lg p-2 text-black" name="message" value={formData.message} onChange={handleChange} />
          </div>
          <div className="flex justify-center mt-2 mb-4"></div>
          <button className="border border-white bg-red-900 movie-header text-2xl py-3 rounded-lg mt-2 mb-5">Publish Comment</button>
        </form>
      )}
    </div>
  );
};

export default CommentForm;
