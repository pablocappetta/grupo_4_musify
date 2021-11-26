// utilizo libreria path para obtener la ruta
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/usersDatabase.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersController = {};

module.exports = usersController;