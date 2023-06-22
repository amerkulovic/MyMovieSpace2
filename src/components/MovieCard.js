import "./MovieCard.css";

const MovieCard = (props) => {
  return (
    <div className="text-center my-2 mx-1 glass py-5">
      <div className="flex flex-col justify-center h-96 w-64">
        <h1 className="font-bold text-white">{props.movieTitle}</h1>
        <img className="p-2" src={props.moviePoster} />
      </div>
    </div>
  );
};

export default MovieCard;
