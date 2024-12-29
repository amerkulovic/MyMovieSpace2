const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bookmark" }],
  watched: [{ type: mongoose.Schema.Types.ObjectId, ref: "WatchedMovie" }],
});

module.exports = mongoose.model("User", UserSchema);
