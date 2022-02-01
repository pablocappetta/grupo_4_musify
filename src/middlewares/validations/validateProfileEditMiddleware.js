/*
	-  Validating Profile Edition -
*/

const path = require('path');
const { body, check } = require('express-validator');

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
		.notEmpty()
		.withMessage('You have to write your email')
		.bail()
		.isEmail()
		.withMessage('You must write a valid email format'),
	body('password')
		.notEmpty()
		.isLength({ min : 8 })
		.withMessage('You have to enter a password'),
    body('description_producer')
		.notEmpty()
		.withMessage('You have to write a brief description about yourself.'),
		
	body('image_producer')
		.custom((value, { req }) => {
			let file = req.file;
			let acceptedExtensions = ['.jpg', '.jpeg','.png', '.gif']; 
			console.log(req.file);
			
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
