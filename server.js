const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();

//connecting to mongodb
mongoose.connect("mongodb://localhost/shrinker");
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.on("open", () => console.log("database connected"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//root
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

//sending post request
app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

//route for short url
app.get("/:short", async (req, res) => {
  const short = await ShortUrl.findOne({ short: req.params.short });
  if (short == null) return res.sendStatus(404);

  short.clicks++; //if clicked on short url ++
  short.save();

  res.redirect(short.full); //redirecting the the full url when you click the short
});

port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running"));
