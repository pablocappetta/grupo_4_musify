/*
	-  Validating Create Product Form  -
*/

const path = require('path');
const { body, check } = require('express-validator');

module.exports = [
	body('product_name')
		.notEmpty()
		.isLength({min : 5})
		.withMessage('Your product needs a name!'),
	body('price')
		.notEmpty()
		.isNumeric()
		.withMessage('You have to enter the price.')
		.toFloat(),
    body('discount')
		.isNumeric()
		.withMessage('Does your product have a discount?')
		.toFloat(),
	body('genre')
		.notEmpty()
		.withMessage('You have to enter the product\'s genre.'),
    body('descriptionProduct')
		.notEmpty()
		.isLength({min : 20})
		.withMessage('You have to write a brief description about the product.'),
	body('producer')
		.notEmpty()
		.isLength({min : 5})
		.withMessage('You have to enter who is the producer of this product.'),
	body('imageProduct')
		.custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', 'jpeg', '.png', '.gif'];

		if (!file) { 
			throw new Error('Your product needs an image.');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Allowed file extensions are ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]


