import { useState } from "react";
import { useParams } from "react-router-dom";

const CommentForm = () => {
  let [isOpen, setIsOpen] = useState(false);

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

    const comment = {
      title: formData.title,
      description: formData.message,
      username: formData.userName,
    };

    fetch(`/message/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    })
      .then(() => {
        console.log("New comment added!");
        setFormData({ userName: "", message: "", title: "" });
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  };

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white rounded-lg w-full p-3 my-3 border-2 border-black">
      <button className="w-full" onClick={() => setIsOpen(!isOpen)}>
        <h1 className="text-center text-3xl movie-header">Leave A Comment</h1>
      </button>
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
          <div className="flex justify-center mt-2 mb-4"></div>
          <button className="bg-red-900 movie-header text-2xl py-3 rounded-lg mt-2 mb-5">Publish Comment</button>
        </form>
      )}
    </div>
  );
};

export default CommentForm;
