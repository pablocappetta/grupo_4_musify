//
const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// Middlewares
const fileUpload = require('../middlewares/multer/multerProductMiddleware');      /* Middleware to upload images with multer pkg */
const createValidation = require('../middlewares/validations/validateCreateMiddleware');      /* Middleware validate the create form */


// Si la solicitud es GET y la ruta '/' llamamos a la funcion index de productsController
router.get("/cart", productsController.cart);

/*** GET PRODUCT DETAILS ***/
router.get("/product/:id", productsController.product);

/*** GET STORE PRODUCTS ***/
router.get("/store", productsController.index);

/*** CREATE PRODUCTS ***/
router.get("/create", productsController.create);

// Multer como Middleware almacena la imagen en store-img
router.post("/create", fileUpload.single("imageProduct"), createValidation, productsController.store); 

/*** EDIT ONE PRODUCT ***/
router.get("/edit", productsController.listProduct);
router.get("/edit/:id", productsController.edit);
router.post("/edit/:id", fileUpload.single("imageProduct"), productsController.update);

/*** DELETE ONE PRODUCT***/
router.post("/delete/:id", productsController.destroy);

// Tengo que exportar el router
module.exports = router;
