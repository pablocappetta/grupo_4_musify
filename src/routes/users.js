// Packages
const express = require("express");
const router = express.Router();
const path = require('path');

// Controller
const usersController = require("../controllers/usersController");

// Middlewares
const fileUpload = require('../middlewares/multerMiddleware');      /* Middleware to upload images with multer pkg */
const userMiddleware = require('../middlewares/userMiddleware');    /* Middleware user state => is logged?, registered? etc */


// Login
router.get("/login",userMiddleware.guestMiddleware ,usersController.login);
router.post("/login", usersController.loginProcess);

// Create user register
router.get("/register",userMiddleware.guestMiddleware , usersController.register);
router.post("/register", fileUpload.single('image'), usersController.signup);

// Profile user
router.get("/profile", userMiddleware.authMiddleware, usersController.profile);

// Edit Profile
router.get("/profile/edit/", usersController.editProfile);
router.post("/profile/edit/:id", fileUpload.single('image'), usersController.update);

// Delete user
router.post("/profile/delete/:id", usersController.destroy);

// Logout
router.get('/logout', usersController.logout);


// Tengo que exportar el router
module.exports = router;