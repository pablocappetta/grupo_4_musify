// Packages
const express = require("express");
const router = express.Router();
const path = require('path');

// Controller
const usersController = require("../controllers/usersController");

// Middlewares
const fileUpload = require('../middlewares/multer/multerMiddleware');      /* Middleware to upload images with multer pkg */
const userMiddleware = require('../middlewares/session/userMiddleware');    /* Middleware user state => is logged?, registered? etc */
const registerValidator = require('../middlewares/validations/validateRegisterMiddleware'); /*  Middle validates registration => captures errors to send them to the views */
const loginValidator = require('../middlewares/validations/validateLoginMiddleware'); /*  Middle validates login => captures errors to send them to the views */
const profileEditValidator = require('../middlewares/validations/validateProfileEditMiddleware'); /*  Middle validates profile edition => captures errors to send them to the views */

// Login
router.get("/login", userMiddleware.guestMiddleware ,usersController.login);
router.post("/login", loginValidator, usersController.loginProcess);

// Create user register
router.get("/register",userMiddleware.guestMiddleware, usersController.register);
router.post("/register", fileUpload.single('image'), registerValidator, usersController.signup);

// Profile user
router.get("/profile", userMiddleware.authMiddleware, usersController.profile);

// Edit Profile
router.get("/profile/edit/", usersController.editProfile);
router.post("/profile/edit/:id", fileUpload.single('image'), profileEditValidator, usersController.update);

// Delete user
router.post("/profile/delete/:id", usersController.destroy);

// Logout
router.get('/logout', usersController.logout);

// -------------------------------------------     API     --------------------------------------------------------- //

router.get("/api/users", usersController.list); // Global endpoint
router.get("/api/users/search", usersController.search); // Search a specific resource
router.get("/api/users/:id", usersController.show); // Specific request
router.post("/api/users", usersController.store); // Creating a resource 
router.delete("/api/users/:id", usersController.delete); // Deleting a resource

module.exports = router;