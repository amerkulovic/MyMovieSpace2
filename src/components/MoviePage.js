import notFoundImg from "./../images/notfoundimg.png";

const MoviePage = () => {
  return (
    <div className="flex flex-row justify-center">
      <div className="mr-5 mt-10">
        <img src={notFoundImg} className="h-4/5 w-96" />
      </div>
      <section className="text-white mt-10">
        <div>
          <h1 className="movie-header text-4xl">Indiana Jones and the Dial of Destiny</h1>
          <p>2023 directed by James Mangold</p>
        </div>
        <p className="w-96 mt-4">Finding himself in a new era, approaching retirement, Indy wrestles with fitting into a world that seems to have outgrown him. But as the tentacles of an all-too-familiar evil return in the form of an old rival, Indy must don his hat and pick up his whip once more to make sure an ancient and powerful artifact doesn’t fall into the wrong hands.</p>
      </section>
    </div>
  );
};

export default MoviePage;
