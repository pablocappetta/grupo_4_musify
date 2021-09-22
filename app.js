const express = require("express");
const app = express();
const path = require("path");

app.listen(42133, () => {
  console.log("Server initiated in port 42133");
  console.log("Hostname: http://localhost:42133");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/register.html"));
});

app.post("/register", (req, res) => {
  res.redirect("/");
});

app.use(express.static("public"));
