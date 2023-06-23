import "./MovieCard.css";

const MovieCard = (props) => {
  return (
    <div className="text-center pt-2 px-1 my-2 mx-1">
      <div className="flex flex-col justify-center w-64 container">
        <img className="p-2 text-center movie-picture" src={props.moviePoster} />
        <h1 className="picture-text text-white">{props.movieTitle}</h1>
      </div>
    </div>
  );
};

export default MovieCard;
