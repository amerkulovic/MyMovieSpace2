import { useEffect } from "react";
import StarRating from "./StarRating";
import defaultPhoto from "../images/default.jpg";
import AOS from "aos";

const ReviewCard = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div
      data-aos="fade-up"
      className="
  flex flex-col
  bg-gradient-to-br from-red-900/90 via-red-700/80 to-red-900/90
  backdrop-blur-md
  text-white
  rounded-2xl
  w-5/6 max-sm:w-11/12
  p-6
  my-4
  border border-white/10
  shadow-lg shadow-black/40
  transition-all duration-300
  hover:scale-[1.01]
  hover:shadow-xl hover:shadow-black/60
"
    >
      <div className="flex justify-between items-start gap-4 max-sm:flex-col">
        <h1 className="movie-header text-3xl max-sm:text-2xl leading-tight">{props.title}</h1>

        <div className="flex-shrink-0">
          <StarRating rating={props.rating} />
        </div>
      </div>
      <section>
        <p className="my-5 text-lg text-white/90 leading-relaxed">{props.text}</p>
        <section className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-white/60">{props?.date}</p>
          <div className="flex items-center gap-3">
            <img src={props.profilePhoto ? props.profilePhoto : defaultPhoto} className="h-10 w-10 rounded-full object-cover border border-white/20" />

            <h1 className="movie-header text-lg text-white/90">{props.username}</h1>
          </div>
        </section>
      </section>
    </div>
  );
};

export default ReviewCard;
