import LoadingSpinner from "./LoadingSpinner";

const LoadingPage = () => {
  return (
    <div className="h-[700px] flex flex-col justify-center items-center">
      <h1 className="movie-header text-7xl">Loading...</h1>
      <LoadingSpinner />
    </div>
  );
};
export default LoadingPage;
