const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  poster: { type: String, required: false },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

const handleError = (err) => console.error(err);

module.exports = Bookmark;
