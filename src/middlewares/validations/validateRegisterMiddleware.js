/*
	-  Validating Register Form -
*/

const path = require('path');
const { body, check } = require('express-validator');
// let db = require("../../database/models");

module.exports = [
	body('first_name')
		.notEmpty()												// Field must be required
		.isLength({min : 2})									// Min 2 characters
		.withMessage('You have to write your name'),

	body('last_name')
		.notEmpty()												// Field must be required
		.isLength({min : 2})										// Min 2 characters
		.withMessage('You have to write your lastname'),		

    body('email')
		.notEmpty()												// Field must be required
		.withMessage('You have to write your email')
		.bail()
		.isEmail()												// Field must be email format
		.withMessage('You must write a valid email format'),
		// .custom((value, {req}) => {
		// 		db.User.findAll()
		// 		.then(function(users){
		// 			console.log("estoy en el middleware")
		// 			console.log(users);
		// 			for (let index = 0; index < users.length ; index++)
		// 			{
		// 				console.log(users[index].email);
		// 				console.log(req.body.email)
		// 				if(users[index].email == req.body.email){
		// 					throw new Error('Email already exist');
		// 				}
		// 			}
					
		// 		})
		// 		return true;
		// }),
	body('description_producer')
		.notEmpty()
		.isLength({min : 10})
		.withMessage("you have to add a short description"),

	body('password')
		.notEmpty()												// Field must be required
		.isLength({ min : 8 })									// Min 8 characters
		.withMessage('You have to enter a password'),

    body('category')
		.notEmpty()
		.withMessage('You have to write a category'),

	body('image')
		.custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.jpeg','.png', '.gif']; 
		
		if (!file) {
			throw new Error('You have to upload an image');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Allowed file extensions are ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]

