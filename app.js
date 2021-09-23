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

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/cart.html"));
});

app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/products.html"));
});

app.use(express.static("public"));
