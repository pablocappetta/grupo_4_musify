//
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Si la solicitud es GET y la ruta '/' llamamos a la funcion index de mainController
router.get('/', mainController.index); 
router.get('/login', mainController.login); 
router.get('/register', mainController.register); 
router.get('/cart', mainController.cart); 
router.get('/products', mainController.products); 
router.get('/contact', mainController.contact); 
router.get('/about', mainController.about);

// Tengo que exportar el router
module.exports = router;