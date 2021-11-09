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
    res.render(archivo, {
      products: products
    });
  },

    // Create - Form to create products
    store: (req, res) => {
      const nuevoArchivo = {
        id: products[products.length - 1].id + 1,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        producer: req.body.producer,
        genre: req.body.genre,
        descriptionProduct: req.body.descriptionProduct,
        descriptionProducer: req.body.descriptionProducer,
        imageProduct: "article72.jpg",
        imageProducer: "6_singular_sounds.jpg",
        popularity: 0,
    };

    products.push(nuevoArchivo);

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

    // @pablo: Hay que revisar esto para hacer que si el ID se crea correctamente, nos redirija hacia la ruta en la web
    res.redirect("/store");
  },

  // Edit - Form to edit products
  edit: (req, res) => {
    let archivo = path.join(
      __dirname,
      "../views/products/product-edit-form"
    );

    const id = req.params.id;
    const product = products.find(product => { 
      return product.id == id;
    });

        // FIX: broken PUT route
        res.render(archivo, {
          productSent: product,
          products: products
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
