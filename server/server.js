const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Review = require("./models/Review");
const Message = require("./models/Message");
const PORT = process.env.PORT || 3001;
const app = express();
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection
const connectionStringURI = process.env.MONGODB_URI;
if (!connectionStringURI) {
  console.error("Error: MONGODB_URI is not defined in the environment variables.");
  process.exit(1);
}
mongoose
  .connect(connectionStringURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
console.log("MongoDB URI:", connectionStringURI);

app.get("/all-reviews", async (req, res) => {
  try {
    const result = await Review.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/all-messages", async (req, res) => {
  try {
    const result = await Message.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/message/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("Error retrieving message:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/create-review", async (req, res) => {
  try {
    const newReview = new Review({
      title: req.body.title,
      description: req.body.description,
      username: req.body.username,
      movieId: req.body.movieId,
      movieRating: req.body.movieRating,
      poster: req.body.poster,
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/create-message", async (req, res) => {
  try {
    const newMessage = new Message({
      title: req.body.title,
      description: req.body.description,
      username: req.body.username,
    });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error creating message:", error.message, error.stack);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/message/:id/comment", async (req, res) => {
  try {
    const { comment } = req.body;
    const messageId = req.params.id;

    if (!comment || !comment.username || !comment.description) {
      return res.status(400).json({ error: "Incomplete comment data" });
    }
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    message.comments.push(comment);
    await message.save();

    res.status(200).json(message);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
