require('dotenv').config()

const express = require("express");
const path = require("path");
const userRoutes = require("./backend/routes/user");
const postsRoutes = require("./backend/routes/post");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const http = require('http');

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

app.use(express.static(path.join(__dirname, './dist')));

app.use("/api/post", postsRoutes);
app.use("/api/user", userRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});