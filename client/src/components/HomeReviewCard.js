import StarRating from "./StarRating";
import { useEffect } from "react";
import defaultPhoto from "../images/default.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeReviewCard = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div data-aos="fade-up" className="flex bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-lg w-4/6 p-3 my-3 relative max-sm:w-11/12 max-sm:flex-col">
      <section className="flex flex-row">
        {/* <a href={`/search/${props.link}`}> */}
          <img src={props.poster} className="w-[95px] h-[145px] mr-5" />
        {/* </a> */}
        <div className="flex flex-col items-start w-[80%] max-sm:w-2/3">
          <h1 className="text-3xl movie-header text-start max-sm:text-2xl">{props.title}</h1>
          <p className="text-white">Reviewed by {props.username}</p>
          <StarRating styling="w-[2px] mr-6" rating={props.rating} />
          <p className="text-white font-bold pt-3 text-start min-w-[500px] max-lg:min-w-0">{props.text}</p>
        </div>
      </section>
      <span className="review-photo-container flex items-center absolute bottom-4 right-4">
        <img src={props.profilePhoto ? props.profilePhoto : defaultPhoto} className="h-[40px]" />
      </span>
    </div>
  );
};

export default HomeReviewCard;
