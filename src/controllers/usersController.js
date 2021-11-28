// utilizo libreria path para obtener la ruta
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const usersFilePath = path.join(__dirname, "../data/usersDatabase.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersController = {

  register: (req, res) => {
    let archivo = path.join(__dirname, "../views/users/register");
    res.render(archivo, {users:users});
  },

  signup: (req, res) => {

    if (req.file) {
        const nuevoUser = {
          id: users[users.length - 1].id + 1,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password),
          category: req.body.category,
          image: req.file.image,
        };
  
        users.push(nuevoUser);
        
        console.log(users)
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
        
      } else {
        let archivo = path.join(__dirname, "../views/users/register");
        res.render(archivo, {
          users: users,
        });
      }
  
      res.redirect("/products/store");
  },

  login: (req, res) => {
    let archivo = path.join(__dirname, "../views/users/login");
    res.render(archivo);
  },
};

module.exports = usersController;
