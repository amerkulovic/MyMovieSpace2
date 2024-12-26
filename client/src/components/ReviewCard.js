import { useEffect } from "react";
import StarRating from "./StarRating";
import AOS from "aos";

const ReviewCard = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div data-aos="fade-up" className="flex flex-col bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-5/6 p-3 my-3 border border-red-700">
      <div className="flex justify-between">
        <h1 className="movie-header text-4xl">{props.title}</h1>
        <StarRating rating={props.rating} />
      </div>
      <section>
        <p className="text-center my-5 mx-5 text-lg font-bold">{props.text}</p>
        <section className="flex flex-row justify-between items-center">
          <p>{props?.date}</p>
          <h1 className="flex justify-end mr-5 movie-header text-xl">-{props.username}</h1>
        </section>
      </section>
    </div>
  );
};

export default ReviewCard;
