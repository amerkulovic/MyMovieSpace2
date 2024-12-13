const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const Review = require("./models/Review");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection
const connectionStringURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mymoviespaceDB";

mongoose
  .connect(connectionStringURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Static file serving (for production builds)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// API Routes
app.get("/all-reviews", async (req, res) => {
  try {
    const result = await Review.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send({ message: "Internal Server Error" });
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
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
