import { Link } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
import notFoundImg from "../images/notfoundimg.png";

const ProfileCard = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div data-aos="zoom-out" className="text-center pt-2 px-1 my-2 max-sm:w-1/2 max-sm:p-0 max-sm:m-0">
      <Link to={`${props.imdbID}`}>
        <div className="flex flex-col justify-center container">
          <img
            className="p-2 text-center profile-movie-picture max-sm:p-0"
            src={props.moviePoster}
            onError={(e) => {
              e.currentTarget.src = notFoundImg;
            }}
          />
          <h1 className="picture-text text-white movie-header">{props.movieTitle}</h1>
        </div>
      </Link>
    </div>
  );
};

export default ProfileCard;
