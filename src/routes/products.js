//
const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// Si la solicitud es GET y la ruta '/' llamamos a la funcion index de productsController
router.get("/cart", productsController.cart);

/*** GET PRODUCT DETAILS ***/
router.get("/product/:id", productsController.product);

/*** GET STORE PRODUCTS ***/
router.get("/store", productsController.index);

/*** CREATE PRODUCTS ***/
router.get("/create", productsController.create);
// @pablo: Hay que ver esto para entender cómo hacer un redirect hacia el ID una vez que fue creado
router.post("/create", productsController.store);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete("/delete/:id", productsController.destroy);

// Tengo que exportar el router
module.exports = router;
