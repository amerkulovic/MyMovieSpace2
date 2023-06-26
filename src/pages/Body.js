import MovieCard from "../components/MovieCard";

const Body = (props) => {
  return (
    <div className="background-image">
      <container className="flex flex-wrap justify-center">{props.movies && props.movies.Search.map((movie) => <MovieCard moviePoster={movie.Poster} movieTitle={movie.Title} imdbID={movie.imdbID} />)}</container>
    </div>
  );
};

export default Body;
