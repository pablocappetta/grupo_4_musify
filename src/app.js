const express = require("express");
const app = express();
const path = require("path");

app.listen(process.env.PORT || 42133, () => {
  console.log("Server initiated in port 42133");
  console.log("Hostname: http://localhost:42133");
});

app.set('view engine', 'ejs'); // Define que el motor que utilizamos es EJS 
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "/views/users/index.ejs"));
});

app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "/views/users/login.ejs"));
});

app.get("/register", (req, res) => {
  res.render(path.join(__dirname, "/views/users/register.ejs"));
});

app.get("/cart", (req, res) => {
  res.render(path.join(__dirname, "/views/products/cart.ejs"));
});

app.get("/products", (req, res) => {
  res.render(path.join(__dirname, "/views/products/products.ejs"));
});

app.get("/contact", (req, res) => {
  res.render(path.join(__dirname, "/views/users/contact.ejs"));
});

app.get("/about", (req, res) => {
  res.render(path.join(__dirname, "/views/users/about.ejs"));
});

app.use(express.static("public"));
