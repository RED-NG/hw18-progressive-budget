const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.Promise = global.Promise;

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb://user1:password1@ds019976.mlab.com:19976/heroku_l9q6jn7c",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      // useMongoClient: true,
    }
  )
  .then(() => console.log("DB Connected successfully!"))
  .catch((err) => {
    console.log("DB connection error: " + err);
  });

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}!`);
});
