const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));

//process.env.PORT -> Heroku PORT
app.listen(process.env.PORT || 42133, () => {
  console.log("Server initiated in port 42133");
  console.log("Hostname: http://localhost:42133");
});

// Define que el motor que utilizamos es EJS 
app.set('view engine', 'ejs');                   
// Define la ubicación de la carpeta de las Vistas       
app.set('views', path.join(__dirname, '/views'));       

// Rutas 
const mainRouter = require('./routes/main');
// const productsRouter = require('./routes/products');

app.use('/',mainRouter);
// app.use('/products'),