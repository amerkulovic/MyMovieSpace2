const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  replies: {
    type: [
      {
        username: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  lastAccessed: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

const handleError = (err) => console.error(err);

module.exports = Comment;
