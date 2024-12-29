const mongoose = require("mongoose");

const watchedMovieSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  poster: { type: String, required: false },
});

const WatchedMovie = mongoose.model("WatchedMovie", watchedMovieSchema);

const handleError = (err) => console.error(err);

module.exports = WatchedMovie;
