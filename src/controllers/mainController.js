// utilizo libreria path para obtener la ruta
const path = require("path");

const mainController = {
  index: (req, res) => {
    let archivo = path.join(__dirname, "../views/users/index");
    res.render(archivo);
  },

  contact: (req, res) => {
    let archivo = path.join(__dirname, "../views/users/contact");
    res.render(archivo);
  },

  about: (req, res) => {
    let archivo = path.join(__dirname, "../views/users/about");
    res.render(archivo);
  },
};

module.exports = mainController;
