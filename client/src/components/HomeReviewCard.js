import StarRating from "./StarRating";
import { useEffect } from "react";
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
    <div data-aos="fade-up" className="flex bg-red-700 rounded-lg w-4/6 p-3 my-3 relative max-sm:w-11/12 max-sm:flex-col">
      <section className="flex flex-row">
        <a href={`/search/${props.link}`}>
          <img src={props.poster} className="w-[95px] h-[145px] mr-5" />
        </a>
        <div className="flex flex-col items-start max-sm:w-2/3">
          <h1 className="text-3xl movie-header max-sm:text-2xl">{props.title}</h1>
          <p className="text-white">Reviewed by {props.username}</p>
          <StarRating styling="w-[2px] mr-6" rating={props.rating} />
          <p className="text-white font-bold pt-3 text-start">{props.text}</p>
        </div>
      </section>
      {/* <section className="absolute bottom-3 right-3 text-white font-bold max-sm:static max-sm:flex max-sm:justify-end">
        <p>{props?.date}</p>
        <h1 className="text-xl">{props.username}</h1>
      </section> */}
    </div>
  );
};

export default HomeReviewCard;
