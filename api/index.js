// File: index.js
// Description: handles all API routing

require("path");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

// catch invalid JSON request bodies
app.use((req, res, next) => {
  bodyParser.json()(req, res, err => {
    if (err) {
      console.error("400: Invalid JSON request body");
      res.status(400).send({error: "400: Invalid JSON request body"});
    } else {
      next();
    }
  });
});

app.use(cors());

// log incoming requests
app.all("/api/*", (req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}\n`);
  next();
});

app.use("/api/notification", require("./notification"));
app.use("/api/review", require("./review"));
app.use("/api/comment", require("./comment"));
app.use("/api/course", require("./course"));
app.use("/api/plan", require("./plan"));
app.use("/api/user", require("./user"));

// statically serve files from the public directory
app.use(express.static("src/public"));

// everything else gets a 404 error
app.get("/api/*", (req, res) => {
  console.error("404: File not found\n");
  res.status(404).send({error: "Not Found"});
});

module.exports = app;
