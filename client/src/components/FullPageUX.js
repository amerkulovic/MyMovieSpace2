import notFoundImg from "./../images/notfoundimg.png";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { json, matchPath, useParams } from "react-router-dom";

const FullPageUX = (props) => {

  return (
    <div className="flex flex-row flex-wrap justify-center">
      <div className="mr-5 my-10">
        <img src={props.poster !== "N/A" ? props.poster : notFoundImg} className="h-[500px] w-96" />
      </div>
      <div className="text-white mt-10">
        <section className="border-b-[0.5px] border-white mb-5">
          <h1 className="movie-header text-5xl w-[800px]">{props.title}</h1>
          <p>
            {props.year} directed by {props.director}
          </p>
        </section>
        <p className="w-[750px] mt-4">{props.plot}</p>
        <section>
          <h2 className="movie-header text-xl mt-5 mb-5 border-b-[0.5px] border-white">Notable Actors</h2>
          <p>{props.actors}</p>
        </section>
        <section>
          <h2 className="movie-header text-xl mt-5 mb-5 border-b-[0.5px] border-white">Reviews</h2>
          {props.ratings.map((rating, i) => (
            <p key={i}>
              {rating.Source} {rating.Value}
            </p>
          ))}
        </section>
        <button onClick={props.bookmarkClick}>
          <FontAwesomeIcon icon={faBookmark} className={props.bmStyling} />
        </button>
      </div>
    </div>
  );
};

export default FullPageUX;
