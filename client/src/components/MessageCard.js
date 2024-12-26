import { Link } from "react-router-dom";

const MessageCard = (props) => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-lg w-4/6 p-3 my-3 max-sm:w-11/12 max-sm:flex-col">
      <section className="flex flex-row">
        <div className="flex flex-col items-start max-sm:w-full">
          <Link to={`/message/${props.link}`}>
            <h1 className="text-3xl movie-header max-sm:text-xl hover:underline">{props.title}</h1>
          </Link>
          <p className="text-white font-bold pt-5 pb-3 text-start">{props.text}</p>
        </div>
      </section>
      <section className="flex justify-end text-white font-bold max-sm:static">
        <p>{props?.date}</p>
        <h1 className="text-md max-sm:text-sm">Posted by {props.username}</h1>
      </section>
    </div>
  );
};

export default MessageCard;
