const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.Promise = global.Promise;

mongoose.connect(
  // process.env.MONGODB_URI ||
  "mongodb://user1:password1@ds019976.mlab.com:19976/heroku_l9q6jn7c",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useMongoClient: true,
  }
);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
