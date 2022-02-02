//
const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// Middlewares
const fileUpload = require('../middlewares/multer/multerProductMiddleware');      /* Middleware to upload images with multer pkg */
const createValidation = require('../middlewares/validations/validateCreateMiddleware');      /* Middleware validate the create form */
const editValidation = require('../middlewares/validations/validateEditMiddleware');      /* Middleware validate the edit prod form */

// -------------------------------------------     CRUD     --------------------------------------------------------- //

router.get("/cart", productsController.cart);

/*** GET PRODUCT DETAILS ***/
router.get("/product/:id", productsController.product);

/*** GET STORE PRODUCTS ***/
router.get("/store", productsController.index);

/*** CREATE PRODUCTS ***/
router.get("/create", productsController.create);

// Using MULTER as middleware
router.post("/create", fileUpload.single("imageProduct"), createValidation, productsController.store); 

/*** EDIT ONE PRODUCT ***/
router.get("/edit", productsController.listProduct);
router.get("/edit/:id", productsController.edit);
router.post("/edit/:id", fileUpload.single("imageProduct"), editValidation, productsController.update);

/*** DELETE ONE PRODUCT***/
router.post("/delete/:id", productsController.destroy);

// -------------------------------------------     API     --------------------------------------------------------- //

router.get("/api", productsController.list); // Global endpoint
router.get("/api/:id", productsController.show); // Specific request
router.post("/api", productsController.store); // Creating a resource 
router.delete("/api/:id", productsController.delete); // Deleting a resource

// ----------------------------------- EXPORTING THE DATA GATHERED IN THE ROUTER ----------------------------------- //

module.exports = router;