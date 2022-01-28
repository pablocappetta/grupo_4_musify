const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('firstName').notEmpty().withMessage('You have to write your name'),
	body('lastName').notEmpty().withMessage('You have to write your lastname'),
    body('email')
		.notEmpty().withMessage('You have to write ypur email').bail()
		.isEmail().withMessage('You must write a valid email format'),
	body('password').notEmpty().withMessage('You have to enter a password'),
    body('category').notEmpty().withMessage('You have to write a category'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

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