import StarRating from "./StarRating";

const HomeReviewCard = (props) => {
  return (
    <div className="flex bg-red-700 rounded-lg w-4/6 p-3 my-3 relative">
      <a href={`/search/${props.link}`}>
        <img src={props.poster} className="w-[95px] h-[145px] mr-5" />
      </a>
      <section className="flex flex-col items-start">
        <h1 className="text-3xl movie-header">{props.title}</h1>
        <StarRating styling="w-[2px] mr-6" rating={props.rating} />
        <p className="text-white font-bold pt-3">{props.text}</p>
      </section>
      <section className="absolute bottom-3 right-3 text-white font-bold">
        <p>{props?.date}</p>
        <h1 className="text-xl">{props.username}</h1>
      </section>
    </div>
  );
};

export default HomeReviewCard;
