import "./MovieCard.css";

const MovieCard = (props) => {
  return (
    <div className="text-center my-2 mx-1 border border-red-400 glass">
      <h1>{props.movieTitle}</h1>
      <div className="flex justify-center h-96 w-72">
        <img src={props.moviePoster} />
      </div>
    </div>
  );
};

export default MovieCard;
