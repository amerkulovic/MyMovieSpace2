import HomeCard from "./HomeCard";
import eye from "../svgs/eye.svg";
import search from "../svgs/search.svg";
import bookmark from "../svgs/bookmark.svg";
import star from "../svgs/star.png";
import bar from "../svgs/bars.svg";
import filmreel from "../svgs/filmreel.svg";
import { useState, useEffect } from "react";
import HomeReviewCard from "./HomeReviewCard";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  let [reviewCap, setReviewCap] = useState(3);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/all-reviews");
        const reviews = await response.json();
        setReviews(reviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const showMoreHandler = () => {
    setReviewCap(recentReviews.length);
  };

  const showLessHandler = () => {
    setReviewCap(3);
  };

  const getRecentReviews = (reviews) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return reviews.filter((review) => {
      const reviewDate = new Date(review.lastAccessed);
      return reviewDate >= oneWeekAgo;
    });
  };

  const recentReviews = getRecentReviews(reviews);

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div className="flex flex-col justify-center py-52 max-md:py-20">
        <h1 className=" flex justify-center text-6xl movie-header mb-5">Search. Save. Discover</h1>
        <div className="flex justify-center">
          <p className="text-white w-10/12 text-2xl font-semibold">Track films you’ve watched. Bookmark those you're interested in. Tell your friends what they need to watch.</p>
        </div>
      </div>
      <section className="flex flex-wrap justify-center w-[80%] pb-[70px]">
        <HomeCard img={eye} text={"Keep track of every film you’ve ever watched (or just start from the day you join)"} />
        <HomeCard img={search} text={"Easily search for any movie, from classics to blockbusters, and find exactly what you're looking for."} />
        <HomeCard img={bookmark} text={"Bookmark your must-watch films to create a personalized list you'll never lose track of."} />
        <HomeCard img={star} text={"Leave star ratings to share your thoughts and help others discover their next favorite movie."} />
        <HomeCard img={bar} text={"Leave written reviews to provide your in-depth analysis of the movies you've watched."} />
        <HomeCard img={filmreel} text={"Expand your love for movies and talk with others who share your passion!"} />
      </section>
      <section className="flex flex-col items-center w-full bg-gradient-to-b from-transparent via-black to-black">
        <h1 className="text-white text-3xl movie-header py-4 text-center">Popular reviews this week</h1>
        <div className="w-[80%] h-px bg-white mx-auto"></div>
        {recentReviews
          .reverse()
          .slice(0, reviewCap)
          .map((review, index) => (
            <HomeReviewCard
              key={index}
              title={review.title}
              link={review.movieId}
              // date={new Date(review.lastAccessed).toLocaleDateString("en-US", {
              //   year: "numeric",
              //   month: "long",
              //   day: "numeric",
              // })}
              poster={review.poster}
              rating={review.movieRating || 0}
              text={review.description}
              username={review.username}
            />
          ))}
        {reviewCap < recentReviews.length && (
          <button onClick={showMoreHandler} className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white rounded-lg w-4/6 p-3 my-3 border-2 border-black text-center text-xl movie-header">
            Show more
          </button>
        )}
        {reviewCap === recentReviews.length && (
          <button onClick={showLessHandler} className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white rounded-lg w-4/6 p-3 my-3 border-2 border-black text-center text-xl movie-header">
            Show less
          </button>
        )}
      </section>
    </div>
  );
};

export default HomePage;
