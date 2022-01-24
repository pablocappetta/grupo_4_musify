//
const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const multer = require("multer");
const path = require('path');

/* === CONFIGURACIONES DE MULTER PARA ALMACENAMIENTO DE IMGS === */
const multerDiskStorage = multer.diskStorage({

    destination:(req, file, callback) => {
        let folder = path.join(__dirname, '../../public/img/store-img'); // Multer guardará acá las fotos enviadas por el form
        callback(null, folder);
    },

    fileName: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    } 
});


let fileUpload = multer({storage: multerDiskStorage});

// Si la solicitud es GET y la ruta '/' llamamos a la funcion index de productsController
router.get("/cart", productsController.cart);

/*** GET PRODUCT DETAILS ***/
router.get("/product/:id", productsController.product);

/*** GET STORE PRODUCTS ***/
router.get("/store", productsController.index);

/*** CREATE PRODUCTS ***/
router.get("/create", productsController.create);

// Multer como Middleware almacena la imagen en store-img
router.post("/create", fileUpload.single("imageProduct"), productsController.store);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", fileUpload.single("imageProduct"), productsController.update); // Multer como Middleware

/*** DELETE ONE PRODUCT***/
router.delete("/delete/:id", productsController.destroy);

// Tengo que exportar el router
module.exports = router;
