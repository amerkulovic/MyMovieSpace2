import notFoundImg from "./../images/notfoundimg.png";

const MoviePage = () => {
  return (
    <div className="flex flex-row justify-center">
      <div className="mr-5 my-10">
        <img src={notFoundImg} className="h-[500px] w-96" />
      </div>
      <div className="text-white mt-10">
        <section className="border-b-[0.5px] border-white mb-5">
          <h1 className="movie-header text-5xl w-[800px]">Indiana Jones and the Dial of Destiny</h1>
          <p>2023 directed by James Mangold</p>
        </section>
        <p className="w-[480px] mt-4">Finding himself in a new era, approaching retirement, Indy wrestles with fitting into a world that seems to have outgrown him. But as the tentacles of an all-too-familiar evil return in the form of an old rival, Indy must don his hat and pick up his whip once more to make sure an ancient and powerful artifact doesn’t fall into the wrong hands.</p>
        <section>
          <h2 className="movie-header text-xl mt-5 mb-5 border-b-[0.5px] border-white">Notable Actors</h2>
          <p>Harrison Ford, Mads Mikkelson</p>
        </section>
        <section>
          <h2 className="movie-header text-xl mt-5 mb-5 border-b-[0.5px] border-white">Reviews</h2>
          <p>Rotten Tomatoes 93%</p>
          <p>iMDB 8/10</p>
        </section>
      </div>
    </div>
  );
};

export default MoviePage;
