import { Link } from "react-router-dom";

const MovieCard = (props) => {
  return (
    <div className="text-center pt-2 px-1 my-2 mr-5">
      <Link to={`${props.imdbID}`}>
        <div className="flex flex-col justify-center w-64 max-sm:w-52 max-xsm:w-40 max-xxsm:w-32 container">
          <img className="p-2 text-center movie-picture" src={props.moviePoster} />
          <h1 className="picture-text text-white movie-header">{props.movieTitle}</h1>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
