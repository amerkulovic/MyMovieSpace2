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
        setMessages(messages.reverse() || []);
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
    <div className="flex w-full justify-center min-h-screen px-4">
      <div className="w-full max-w-5xl flex flex-col items-center gap-6 py-8">

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
            <h1 className="movie-header text-4xl max-w-xl">
              No messages yet
            </h1>
            <p className="text-white/60">
              Start the conversation about your favorite movies
            </p>
            <NewMessageForm addNewMessage={addNewMessage} />
          </div>
        ) : (
          <>
            <h1 className="text-white text-4xl movie-header text-center tracking-tight">
              Message Board
            </h1>
            <p className="text-white/60 text-sm text-center -mt-2">
              Join the discussion
            </p>

            <div className="w-full h-px bg-white/10"></div>

            <section className="w-full flex flex-col items-center gap-4 mt-2">
              {messages.slice(0, messageCap).map((message, index) => (
                <MessageCard
                  key={index}
                  link={message._id}
                  title={message.title}
                  text={message.description}
                  username={message.username}
                />
              ))}
            </section>
            
            {isLoggedIn ? (
              <div className="w-full flex flex-col items-center gap-4 mt-4">
                <NewMessageForm addNewMessage={addNewMessage} />

                {messageCap < messages.length && (
                  <button
                    onClick={showMoreHandler}
                    className="
                      bright-red
                      text-white
                      rounded-xl
                      w-full
                      p-3
                      text-center
                      text-lg
                      movie-header
                      shadow-md
                      transition-all duration-200
                      hover:scale-[1.02]
                      hover:shadow-lg
                    "
                  >
                    Show more
                  </button>
                )}

                {messageCap === messages.length && messages.length > 5 && (
                  <button
                    onClick={showLessHandler}
                    className="
                      bright-red
                      text-white
                      rounded-xl
                      w-full
                      p-3
                      text-center
                      text-lg
                      movie-header
                      shadow-md
                      transition-all duration-200
                      hover:scale-[1.02]
                      hover:shadow-lg
                    "
                  >
                    Show less
                  </button>
                )}
              </div>
            ) : (
              <div className="
                bright-red
                text-white
                rounded-xl
                w-full
                p-4
                text-center
                shadow-md
                border border-white/10
              ">
                <a href="/login">
                  <h1 className="text-2xl movie-header">
                    Login to add to the discussion!
                  </h1>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;