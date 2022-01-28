const path = require('path');
const { body, check } = require('express-validator');

module.exports = [
    body('email')
		.notEmpty()
		.withMessage('You have to write your email')
		.bail()
		.isEmail()
		.withMessage('You must write a valid email format'),
	body('password')
		.notEmpty()
		.isLength({ min : 8 })
		.withMessage('You have to enter a password')
]