const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('first_name')
		.notEmpty()
		.withMessage('You have to write your name'),
	body('last_name')
		.notEmpty()
		.withMessage('You have to write your lastname'),
    body('email')
		.notEmpty()
		.withMessage('You have to write your email')
		.bail()
		.isEmail()
		.withMessage('You must write a valid email format'),
	body('password')
		.notEmpty()
		.isStrongPassword()
		.withMessage('You have to enter a password'),
    body('category')
		.notEmpty()
		.withMessage('You have to write a category'),
	body('image')
		.custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];


		
		if (!file) {
			// console.log("JODER TÍO HE QUEDADO ATRAPADO EN LA MIDDLEWARE");
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