const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  username: { type: String, required: true },
  movieId: { type: String, required: true },
  movieRating: { type: Number, required: true },
  poster: { type: String, required: false },
  profilePhoto: {
    type: String,
    default: "",
    required: false,
  },
  lastAccessed: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

const handleError = (err) => console.error(err);

module.exports = Review;
