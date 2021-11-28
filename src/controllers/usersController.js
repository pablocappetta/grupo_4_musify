// utilizo libreria path para obtener la ruta
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/usersDatabase.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersController = {
    
  register: (req, res) => {
    let archivo = path.join(__dirname, "../views/users/register");
    res.render(archivo);
  },

  login: (req, res) => {
    let archivo = path.join(__dirname, "../views/users/login");
    res.render(archivo);
  },
};

module.exports = usersController;
