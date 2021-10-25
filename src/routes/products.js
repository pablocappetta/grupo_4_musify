//
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Si la solicitud es GET y la ruta '/' llamamos a la funcion index de productsController 
router.get('/products', productsController.products);  
router.get('/cart', productsController.cart);  

// Tengo que exportar el router
module.exports = router;