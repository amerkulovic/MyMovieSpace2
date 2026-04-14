import StarRating from "./StarRating";
import { useEffect } from "react";
import defaultPhoto from "../images/default.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import notFoundImg from "../images/notfoundimg.png";

const HomeReviewCard = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div
      data-aos="fade-up"
      className="flex flex-col bg-gradient-to-br from-red-900/90 via-red-700/80 to-red-900/90 backdrop-blur-md text-white rounded-2xl max-sm:w-11/12 p-6 my-4 border border-white/10 shadow-lg shadow-black/40 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-black/60">
      <section className="flex flex-row">
        <a href={`/search/${props.link}`}>
          <img
            src={props.poster}
            onError={(e) => {
              e.currentTarget.src = notFoundImg;
            }}
            className="w-[95px] h-[145px] mr-5"
          />
        </a>
        <div className="flex flex-col items-start w-[80%] max-sm:w-2/3 pb-[55px]">
          <h1 className="text-3xl movie-header text-start max-sm:text-2xl">{props.title}</h1>
          <p className="text-white leading-relaxed">Reviewed by {props.username}</p>
          <div className="flex-shrink-0">
            <StarRating rating={props.rating} />
          </div>
          <p className="my-5 text-lg text-white/90 leading-relaxed">{props.text}</p>
        </div>
      </section>
      <span className="review-photo-container flex items-center absolute bottom-5 right-5 max-sm:justify-end">
        <img src={props.profilePhoto ? props.profilePhoto : defaultPhoto} className="h-10 w-10 rounded-full object-cover border border-white/20" />
      </span>
    </div>
  );
};

export default HomeReviewCard;
