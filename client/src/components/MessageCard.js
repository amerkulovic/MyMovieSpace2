import { Link } from "react-router-dom";

const MessageCard = (props) => {
  return (
    <div className="flex bg-red-700 rounded-lg w-4/6 p-3 my-3 relative max-sm:w-11/12 max-sm:flex-col">
      <section className="flex flex-row">
        <div className="flex flex-col items-start max-sm:w-2/3">
          <Link to={`/message/${props.link}`}>
            <h1 className="text-3xl movie-header max-sm:text-2xl hover:underline">{props.title}</h1>
          </Link>
          <p className="text-white font-bold pt-5 text-start">{props.text}</p>
        </div>
      </section>
      <section className="absolute bottom-3 right-3 text-white font-bold max-sm:static max-sm:flex max-sm:justify-end">
        <p>{props?.date}</p>
        <h1 className="text-xl">{props.username}</h1>
      </section>
    </div>
  );
};

export default MessageCard;
