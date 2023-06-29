import "./MovieCard.css";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  return (
    <div className="text-center pt-2 px-1 my-2 mx-1">
      <Link to={`${props.imdbID}`} onClick={props.clickHandler}>
        <div className="flex flex-col justify-center w-64 container" onClick={props.clickHandler}>
          <img className="p-2 text-center movie-picture" src={props.moviePoster} />
          <h1 className="picture-text text-white movie-header">{props.movieTitle}</h1>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
