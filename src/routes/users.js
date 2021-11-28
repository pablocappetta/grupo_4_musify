//
const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const usersController = require("../controllers/usersController");

/* === CONFIGURACIONES DE MULTER PARA ALMACENAMIENTO DE IMGS === */

const multerDiskStorage = multer.diskStorage({

    destination:(req, file, callback) => {
        let folder = path.join(__dirname, '../public/img/producer-img'); // Multer guardará acá las fotos enviadas por el form
        callback(null, folder);
    },

    fileName: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    } 
});

let fileUpload = multer({storage: multerDiskStorage});

router.get("/login", usersController.login);
router.get("/register", fileUpload.single("image"), usersController.register);


// Agrego el multer como middleware de ruta
//router.post("/", fileUpload.single(""), productsController.cart);

// Tengo que exportar el router
module.exports = router;
