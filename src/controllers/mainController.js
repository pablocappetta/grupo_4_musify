// utilizo libreria path para obtener la ruta
const path = require("path");

let db = require("../database/models");

const mainController = {
  index: (req, res) => {
    let file = path.join(__dirname, "../views/users/index");
    db.Product.findAll()
    .then(function(products){
      res.render(file,{products : products});
    });
    
  },

  contact: (req, res) => {
    let file = path.join(__dirname, "../views/users/contact");
    res.render(file);
  },

  about: (req, res) => {
    let file = path.join(__dirname, "../views/users/about");
    res.render(file);
  },
};

module.exports = mainController;
