import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import NewMessageForm from "./NewMessageForm";
import MessageCard from "./MessageCard";
import LoadingPage from "./LoadingPage";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [messageCap, setMessageCap] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch("/all-messages");
        const messages = await response.json();
        setMessages(messages.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const showMoreHandler = () => {
    setMessageCap(messages.length);
  };

  const showLessHandler = () => {
    setMessageCap(5);
  };

  const addNewMessage = (newMessage) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

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
          <section className="w-full flex flex-col items-center">
            {messages.slice(0, messageCap).map((message, index) => (
              <MessageCard key={index} link={message._id} title={message.title} text={message.description} username={message.username} />
            ))}
          </section>
          {isLoggedIn ? (
            <>
              <NewMessageForm addNewMessage={addNewMessage} />
              {messageCap < messages.length && (
                <button onClick={showMoreHandler} className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-5/6 p-3 my-3 border-2 border-black text-center text-xl movie-header">
                  Show more
                </button>
              )}
              {messageCap === messageCap.length && messages.length > 5 && (
                <button onClick={showLessHandler} className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-5/6 p-3 my-3 border-2 border-black text-center text-xl movie-header">
                  Show less
                </button>
              )}
            </>
          ) : (
            <div className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-8/12 p-3 my-3 border-2 border-black">
              <a href="/login">
                <h1 className="text-center text-3xl movie-header">Login to add to the discussion!</h1>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
