import StarRating from "./StarRating";

const ReviewCard = (props) => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-black via-red-600 to-black text-white rounded-lg w-5/6 p-3 my-3 border border-red-700">
      <div className="flex justify-between">
        <h1 className="movie-header text-4xl">{props.title}</h1>
        <StarRating rating={props.rating} />
      </div>
      <section>
        <p className="text-center my-5 mx-5 text-lg font-light">{props.text}</p>
        <section className="flex flex-row justify-between items-center">
          <p>{props.date}</p>
          <h1 className="flex justify-end mr-5 movie-header text-xl">-{props.username}</h1>
        </section>
      </section>
    </div>
  );
};

export default ReviewCard;
