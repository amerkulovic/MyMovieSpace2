import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import notFoundImg from "./../images/notfoundimg.png";
import LoadingPage from "./LoadingPage";
import ReviewCard from "./ReviewCard";

const MoviePage = () => {
  let [movie, setMovie] = useState(null);

  let { id } = useParams();

  const showMovie = async () => {
    await fetch(`http://www.omdbapi.com/?i=${id}&apikey=f14ca85d`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setMovie(data);
      });
  };

  useEffect(() => {
    showMovie();
    console.log(movie);
  }, []);

  return (
    <>
      {!movie && <LoadingPage />}
      {movie && (
        <div className="flex flex-col">
          <div className="flex flex-row justify-center">
            <div className="mr-5 my-10">
              <img src={movie.Poster} className="h-[500px] w-96" />
            </div>
            <div className="text-white mt-10">
              <section className="border-b-[0.5px] border-white mb-5">
                <h1 className="movie-header text-5xl w-[800px]">{movie.Title}</h1>
                <p>
                  {movie.Year} directed by {movie.Director}
                </p>
              </section>
              <p className="w-[750px] mt-4">{movie.Plot}</p>
              <section>
                <h2 className="movie-header text-xl mt-5 mb-5 border-b-[0.5px] border-white">Notable Actors</h2>
                <p>{movie.Actors}</p>
              </section>
              <section>
                <h2 className="movie-header text-xl mt-5 mb-5 border-b-[0.5px] border-white">Reviews</h2>
                {movie.Ratings.map((rating, i) => (
                  <p key={i}>
                    {rating.Source} {rating.Value}
                  </p>
                ))}
              </section>
            </div>
          </div>
          <section className="mb-10 flex flex-col items-center">
            <h1 className="flex justify-center movie-header text-4xl border-b-[0.5px] border-white w-[900px] mb-4">User Reviews</h1>
            <ReviewCard title="Amazing Movie" date="7/3/23" text="It was great to see Harrison Ford play the role of Indiana Jones one last time!It was great to see Harrison Ford play the role of Indiana Jones one last time!It was great to see Harrison Ford play the role of Indiana Jones one last time!It was great to see Harrison Ford play the role of Indiana Jones one last time!" username="Akulovic" />
            <ReviewCard title="Amazing Movie" date="7/3/23" text="It was great to see Harrison Ford play the role of Indiana Jones one last time!" username="Akulovic" />
            <ReviewCard title="Amazing Movie" date="7/3/23" text="It was great to see Harrison Ford play the role of Indiana Jones one last time!" username="Akulovic" />
          </section>
        </div>
      )}
    </>
  );
};

export default MoviePage;
