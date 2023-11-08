import { FaStar } from "react-icons/fa";

const StarRating = (props) => {
  return (
    <div className="flex flex-row">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <FaStar size={25} color={currentRating <= props.rating ? "#ffc107" : "#e4e5e9"} />
          </label>
        );
      })}
    </div>
  );
};
export default StarRating;
