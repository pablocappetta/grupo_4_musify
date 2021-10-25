// utilizo libreria path para obtener la ruta 
const path = require('path');

const productsController = {
    
    cart:(req, res) => {
        let archivo = path.join(__dirname, "../views/products/cart");
        res.render(archivo);
      },
      
    products: (req, res) => {
        let archivo = path.join(__dirname, "../views/products/products");
        res.render(archivo);
      }

};

module.exports = productsController;