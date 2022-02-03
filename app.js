// ************ Require's ************
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookies = require('cookie-parser');
const methodOverride = require("method-override"); 
const userLoggedMiddleware = require('./src/middlewares/session/userLoggedMiddleware');

// ************ Express() ************

const app = express();

// ************ Middlewares ************
app.use(session({secret : "secret", resave: false, saveUninitialized: false})); // Use session (cross all soft)
app.use(express.static(path.join(__dirname, "./public")));
app.use(methodOverride("_method")); // in order to use PUT & DELETE https methods
app.use(express.urlencoded({ extended: false })); // Para poder tomar los parámetros desde el POST
app.use(express.json()); // Para poder trabajar con stringify y demás
app.use(cookies());       // Para trabajar con las cookies
app.use(userLoggedMiddleware); // REVISAR COOKIES

const port = 42133;

//process.env.PORT -> Heroku PORT
app.listen(process.env.PORT || port, () => {
  console.log(`Server initiated in port: ${port}`);
  console.log(`Hostname: http://localhost:${port}`);
});

// ************ Template Engine ************
app.set("view engine", "ejs"); // Defines that the view engine used will be ejs.
app.set("views", path.join(__dirname, "/views")); // Defines path to the views folder.

// ************ Routes ************
const mainRouter = require("./src/routes/main");
const productsRouter = require("./src/routes/products");
const usersRouter = require("./src/routes/users");

app.use("/", mainRouter);
app.use('/', usersRouter);
app.use("/products", productsRouter);

module.exports = port;