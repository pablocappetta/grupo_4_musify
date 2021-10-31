// utilizo libreria path para obtener la ruta
const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productsController = {
  index: (req, res) => {
    let archivo = path.join(__dirname, "../views/products/store");
    res.render(archivo, {
      productSent: products,
    });
  },

  cart: (req, res) => {
    let archivo = path.join(__dirname, "../views/products/cart");
    res.render(archivo);
  },

  // Product - Method to render details page
  product: (req, res) => {
    let archivo = path.join(__dirname, "../views/products/product");

    const id = req.params.id;
    const product = products.find((product) => {
      return product.id == id;
    });

    res.render(archivo, {
      productSent: product,
      productLoop: products,
    });
  },

  // Create - Form to create products
  create: (req, res) => {
    let archivo = path.join(__dirname, "../views/products/product-create-form");
    res.render(archivo);
  },

  // Edit - Form to edit products
  edit: (req, res) => {
    let archivo = path.join(
      __dirname,
      "../views/products/product-edit-form-id"
    );
    res.render(archivo, {
      productSent: products,
    });
  },

  // Update - Method to update
  update: (req, res) => {
    res.send("Producto " + req.params.id + " editado");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    res.send("Producto " + req.params.id + " eliminado");
  },
};

module.exports = productsController;
