const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Review = require("./models/Review");
const Message = require("./models/Message");
const Bookmark = require("./models/Bookmark");
const WatchedMovie = require("./models/WatchedMovie");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 3001;
const app = express();
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const SECRET = process.env.JWT_SECRET;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    req.username = verified.username;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(403).json({ message: "Invalid Token" });
  }
};

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

app.get("/all-users", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/users/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
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

app.get("/user-reviews/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username }).populate("reviews");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ reviews: user.reviews });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/user-bookmarks/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username }).populate("bookmarks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ bookmarks: user.bookmarks });
  } catch (error) {
    console.error("Error fetching user bookmarks:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/user-watched/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username }).populate("watched");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ watched: user.watched });
  } catch (error) {
    console.error("Error fetching user watched movies:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/create-review", async (req, res) => {
  try {
    const reviewData = new Review({
      title: req.body.title,
      description: req.body.description,
      username: req.body.username,
      movieId: req.body.movieId,
      movieRating: req.body.movieRating,
      poster: req.body.poster,
    });

    const newReview = new Review(reviewData);
    const savedReview = await newReview.save();

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.reviews.push(savedReview._id);
    await user.save();

    res.status(201).json({
      message: "Review created and added to user profile",
      review: savedReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/create-bookmark/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const { id, title, poster } = req.body;

    const savedBookmark = await Bookmark.findOneAndUpdate({ id }, { id, title, poster }, { upsert: true, new: true });

    const user = await User.findOne({ username }).populate("bookmarks");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const watchedMovieExists = user.bookmarks.some((bookmark) => bookmark.id === id);
    if (watchedMovieExists) {
      // Remove the bookmark from the user's profile
      user.bookmarks = user.bookmarks.filter((bookmark) => bookmark.id !== id);
      await user.save();
      return res.status(200).json({ message: "Bookmark removed from user's profile" });
    }
    user.bookmarks.push(savedBookmark._id);
    await user.save();

    res.status(201).json({
      message: "Bookmark created and added to user profile",
      bookmark: savedBookmark,
      bookmarked: true,
    });
  } catch (error) {
    console.error("Error creating bookmark:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/create-watched/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const { id, title, poster } = req.body;

    const savedWatchedMovie = await WatchedMovie.findOneAndUpdate({ id }, { id, title, poster }, { upsert: true, new: true });

    const user = await User.findOne({ username }).populate("watched");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const watchedMovieExists = user.watched.some((movie) => movie.id === id);
    if (watchedMovieExists) {
      user.watched = user.watched.filter((movie) => movie.id !== id);
      await user.save();
      return res.status(200).json({ message: "Watched movie removed from user's profile" });
    }
    user.watched.push(savedWatchedMovie._id);
    await user.save();

    res.status(201).json({
      message: "Watched movie created and added to user profile",
      watched: savedWatchedMovie,
      hasWatched: true,
    });
  } catch (error) {
    console.error("Error creating watched movie:", error);
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

app.post("/signup", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password during signup:", hashedPassword);

    const newUser = new User({ username, firstName, lastName, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login request:", req.body);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username);
      return res.status(400).json({ message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", username);
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: "1h" });

    console.log("Token generated for user:", username);
    res.json({
      token,
      username: user.username,
    });
  } catch (error) {
    console.error("Error in /login route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/delete-user/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.deleteOne({ username });

    res.status(200).json({ message: `User ${username} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
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
