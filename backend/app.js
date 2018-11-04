require('dotenv').config()

const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/post");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cors = require('cors');

const app = express();
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )

  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204
}
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, './../dist')));

app.use("/api/post", postsRoutes);
app.use("/api/user", userRoutes);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});