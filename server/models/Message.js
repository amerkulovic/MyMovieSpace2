const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  username: { type: String, required: true },
  lastAccessed: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

const handleError = (err) => console.error(err);

module.exports = Message;
