import { Link } from "react-router-dom";

const MovieCard = (props) => {
  return (
    <div className="text-center pt-2 px-1 my-2 mr-5 max-sm:w-1/2 max-sm:p-0 max-sm:m-0">
      <Link to={`${props.imdbID}`}>
        <div className="flex flex-col justify-center container">
          <img className="p-2 text-center movie-picture max-sm:p-0" src={props.moviePoster} />
          <h1 className="picture-text text-white movie-header">{props.movieTitle}</h1>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
