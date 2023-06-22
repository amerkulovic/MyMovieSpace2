import "./MovieCard.css";

const MovieCard = (props) => {
  return (
    <div className="text-center pt-2 px-1 my-2 mx-1 glass">
      <div className="flex flex-col justify-center w-64">
        <h1 className="font-bold text-white">{props.movieTitle}</h1>
        <img className="p-2 h-96" src={props.moviePoster} />
      </div>
    </div>
  );
};

export default MovieCard;
