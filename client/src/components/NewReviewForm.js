import { useState } from "react";
import { useParams } from "react-router-dom";

const NewReviewForm = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  let [username, setUsername] = useState("");
  let [message, setMessage] = useState("");
  let [title, setTitle] = useState("");
  let { id } = useParams();

  let usernameHandler = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };
  let messageHandler = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };
  let titleHandler = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };
  let submitHandler = (e) => {
    // e.preventDefault();

    fetch("/create-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: message, username: username, movieId: id}),
    }).then(() => {
      console.log("new review added!");
    });
  };
  return (
    <>
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white rounded-lg w-5/6 p-3 my-3 border-2 border-black">
        <button className="w-full" onClick={() => setIsOpen(!isOpen)}>
          <h1 className="text-center text-3xl movie-header">Leave A Review</h1>
        </button>
        {isOpen && (
          <form className="flex flex-col" onSubmit={submitHandler}>
            <div className="my-4">
              <div>
                <label className="text-white">Username:</label>
              </div>
              <div>
                <input className="w-full rounded-lg p-2 text-black" onChange={usernameHandler} />
              </div>
            </div>
            <div className="my-4">
              <div>
                <label className="text-white">Title:</label>
              </div>
              <div>
                <input className="w-full rounded-lg p-2 text-black" onChange={titleHandler} />
              </div>
            </div>
            <div className="my-4">
              <div>
                <label className="text-white">Message:</label>
              </div>
              <textarea className="w-full rounded-lg p-2 text-black" onChange={messageHandler} />
            </div>
            <button className="bg-red-900 movie-header text-2xl py-3 rounded-lg mb-10">Publish Review</button>
          </form>
        )}
      </div>
    </>
  );
};

export default NewReviewForm;
