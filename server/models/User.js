const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  bookmarks: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      poster: { type: String, required: true },
    },
  ],
  watched: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      poster: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
