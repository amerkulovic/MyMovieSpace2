import { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewMessageForm = (props) => {
  let [isOpen, setIsOpen] = useState(false);

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

    fetch(`/create-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: formData.title, description: formData.message, username: formData.userName }),
    })
      .then(() => {
        console.log("new review added!");
      })
      .catch((error) => {
        console.error("Error creating review:", error);
      });
  };
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white rounded-lg w-8/12 p-3 my-3 border-2 border-black max-sm:w-11/12">
      <div className="flex items-center">
        <FontAwesomeIcon className={`text-2xl hover:cursor-pointer ${!isOpen ? "hidden" : ""}`} icon={faX} onClick={() => setIsOpen(!isOpen)} />
        <button className="w-full" onClick={() => setIsOpen(!isOpen)}>
          <h1 className="text-center text-3xl movie-header">Leave A Message</h1>
        </button>
      </div>
      {isOpen && (
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="my-4">
            <label className="text-white">Username:</label>
            <input className="w-full rounded-lg p-2 text-black" name="userName" value={formData.userName} onChange={handleChange} />
          </div>
          <div className="my-4">
            <label className="text-white">Movie Name & Title of Post:</label>
            <input className="w-full rounded-lg p-2 text-black" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="my-4">
            <label className="text-white">Message:</label>
            <textarea className="w-full rounded-lg p-2 text-black" name="message" value={formData.message} onChange={handleChange} />
          </div>
          <button className="bg-red-900 movie-header text-2xl py-3 rounded-lg mt-2 mb-5">Leave Comment</button>
        </form>
      )}
    </div>
  );
};

export default NewMessageForm;
