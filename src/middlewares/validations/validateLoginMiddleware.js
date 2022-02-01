/*
	-  Validating Login -
*/

const path = require('path');
const { body, check } = require('express-validator');

module.exports = [
    body('email')
		.notEmpty()													// Field must be required
		.withMessage('You have to write your email')				
		.bail()
		.isEmail()													// Valid email format
		.withMessage('You must write a valid email format'),

	body('password')
		.notEmpty()													// Field must be required
		.isLength({ min : 8 })										// Min 8 characters
		.withMessage('You have to enter a password')
]