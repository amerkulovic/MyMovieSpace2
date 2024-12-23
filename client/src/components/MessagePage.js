import { useState, useEffect } from "react";
import NewMessageForm from "./NewMessageForm";
import MessageCard from "./MessageCard";

const MessagePage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/all-messages");
        const messages = await response.json();
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex w-full justify-center">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center">
          <h1 className="movie-header text-center text-6xl flex justify-center items-center h-[600px] w-5/6">No messages yet. Leave a message about any movie topic!</h1>
          <NewMessageForm />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-white text-3xl movie-header py-4 text-center">Message Board</h1>
          <div className="w-[80%] h-px bg-white mx-auto"></div>
          {messages.reverse().map((review, index) => (
            <MessageCard key={index} title={review.title} text={review.description} username={review.username} />
          ))}
          <NewMessageForm />
        </div>
      )}
    </div>
  );
};

export default MessagePage;
