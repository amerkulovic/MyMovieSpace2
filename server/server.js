const express = require('express');
const db = require('./config/connection');
const mongodb = require('mongodb').MongoClient;

const PORT = process.env.PORT || 3001;
const app = express();

const connectionStringURI = `mongodb://127.0.0.1:27017/mymoviespaceDB`;

mongodb.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/create', (req, res) => {
    // Use db connection to add a document
    db.collection('reviewsCollection').insertOne(
      { name: req.body.name, body: req.body.body },
      (err, results) => {
        if (err) throw err;
        res.json(results);
      }
    );
  });


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
