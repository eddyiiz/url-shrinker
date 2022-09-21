const express = require("express");
const mongoose = require("mongoose");
const app = express();

//connecting to mongodb
mongoose.connect("mongodb://localhost/shrinker");
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.on("open", () => console.log("database connected"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/shortUrls", (req, res) => {});

port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running"));
