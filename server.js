const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running"));
