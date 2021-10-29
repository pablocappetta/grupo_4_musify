// ************ Require's ************
const express = require("express");
const path = require("path");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE

// ************ express() ************
const app = express();

// ************ Middlewares ************
app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//process.env.PORT -> Heroku PORT
app.listen(process.env.PORT || 42133, () => {
  console.log("Server initiated in port 42133");
  console.log("Hostname: http://localhost:42133");
});

// ************ Template Engine ************
app.set("view engine", "ejs"); // Defines that the view engine used will be ejs.
app.set("views", path.join(__dirname, "/views")); // Defines path to the views folder.

// ************ Routes ************
const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");

app.use("/", mainRouter);
app.use("/", productsRouter);
