// Packages
const express = require("express");
const router = express.Router();
const path = require('path');

// Controller
const usersController = require("../controllers/usersController");

// Middlewares
const fileUpload = require('../middlewares/multerMiddleware');      /* Middleware to upload images with multer pkg */
const userMiddleware = require('../middlewares/userMiddleware');    /* Middleware user state => is logged?, registered? etc */

// Form register
router.get("/register",userMiddleware.guestMiddleware , usersController.register);

// Form Login
router.get("/login",userMiddleware.guestMiddleware ,usersController.login);

// Create user register
router.post("/register", fileUpload.single('image'), usersController.signup);

// Process login
router.post("/login", usersController.loginProcess);

// Profile user
router.get("/profile", userMiddleware.authMiddleware, usersController.profile);

// Logout
router.get('/logout', usersController.logout);


// ---------------------------------------------------------------------------------
// Test
// ---------------------------------------------------------------------------------
router.get('/test', usersController.test);




// Tengo que exportar el router
module.exports = router;
