const express = require("express");
const db = require("./config/connection");
const Review = require("./models/Review");
const mongodb = require("mongodb").MongoClient;

const PORT = process.env.PORT || 3001;
const app = express();

const connectionStringURI = `mongodb://127.0.0.1:27017/mymoviespaceDB`;

mongodb.connect(connectionStringURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  db = client.db();
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/all-reviews", async (req, res) => {
  try {
    const result = await Review.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/create-review", (req, res) => {
  const newReview = new Review({ title: req.body.title, description: req.body.description, username: req.body.username });
  newReview.save();
  if (newReview) {
    res.status(201).json(newReview);
  } else {
    console.log("Uh Oh, something went wrong");
    res.status(500).json({ error: "Something went wrong" });
  }
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
