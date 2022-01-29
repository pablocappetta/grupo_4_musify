// utilizo libreria path para obtener la ruta
const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(
  __dirname,
  "../database/productsDataBase.json"
);
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

let db = require("../database/models");

const productsController = {
  index: (req, res) => {
    let archivo = path.join(__dirname, "../views/products/store");
    res.render(archivo, {
      productSent: products,
    });
  },

  cart: (req, res) => {
    let file = path.join(__dirname, "../views/products/cart");
    res.render(file);
  },

  // Product - Method to render details page
  product: (req, res) => {
    let file = path.join(__dirname, "../views/products/product");

    const id = req.params.id;
    const product = products.find((product) => {
      return product.id == id;
    });

    res.render(file, {
      productSent: product,
      productLoop: products,
    });
  },

  // Create - Form to create products
  create: (req, res) => {
    let file = path.join(
      __dirname,
      "../views/products/productsByUser/product-create-form"
    );

    /* OLD METHOD JSON */
    // res.render(file, {
    //   products: products,
    // });

    /* WITH DATABASE */
    let reqProduct = db.Product.findAll();
    let reqGenres = db.Genre.findAll();

    Promise.all([reqProduct, reqGenres]).then(function ([products, genres]) {
      res.render(file, { products: products, genres: genres });
    });
  },

  // Create - Form to create products | Multer form validation
  store: (req, res) => {
    /* OLD METHOD JSON 
    if (req.file) {
      const nuevoArchivo = {
        id: products[products.length - 1].id + 1,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        genre: req.body.genre,
        descriptionProduct: req.body.descriptionProduct,
        descriptionProducer: req.body.descriptionProducer,
        imageProduct: req.file.filename,
        imageProducer: "6_singular_sounds.jpg",
        popularity: 0,
      };

      products.push(nuevoArchivo);

      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    } else {
      let archivo = path.join(__dirname, "../views/products/product-create-form");
      res.render(archivo, {
        products: products,
      });
    }

    res.redirect("/products/store");
    */

    const resultValidation = validationResult(req);
    /* WITH DATABASE */
    let reqProduct = db.Product.findAll();
    let reqGenres = db.Genre.findAll();

    db.Product.create({
      users_id: req.session.userLogged.id,
      genre_id: req.body.genre,
      product_name: req.body.product_name,
      price: req.body.price,
      discount: req.body.discount,
      producer: req.body.producer,
      product_description: req.body.descriptionProduct,
      product_image: req.file.filename,
      popularity: 0,
    });

    // Create product validation form
    if (resultValidation.errors.length > 0) {
      Promise.all([reqProduct, reqGenres])
        .then(function ([products, genres]) {
          res.render(file, {
            products: products,
            genres: genres,
            errors: resultValidation.mapped(),
            oldData: req.body,
          });
      });
    }

    res.redirect("/products/store");
  },

  listProduct: (req, res) => {
    let file = path.join(
      __dirname,
      "../views/products/productsByUser/ProductsList"
    ); // Path view
    db.Product.findAll().then(function (products) {
      let array = JSON.parse(JSON.stringify(products)); // Transform data to Array
      const productsByUser = array.filter(function (products) {
        // Filter products by user logged
        if (products.users_id == req.session.userLogged.id) {
          return products;
        }
      });
      res.render(file, { productsByUser: productsByUser });
    });
  },

  // Edit - Form to edit products
  edit: (req, res) => {
    let file = path.join(
      __dirname,
      "../views/products/productsByUser/product-edit-form"
    ); // path view
    const id = req.params.id; // Primary key id product

    let reqGenres = db.Genre.findAll();
    let reqProduct = db.Product.findByPk(id, {
      include: [{ association: "genre" }, { association: "user" }],
    });
    Promise.all([reqProduct, reqGenres]).then(function ([product, genres]) {
      res.render(file, { product: product, genres: genres });
    });

    /* OLD METHOD JSON 
    // const product = products.find((product) => {
    //   return product.id == id;
    // });

    // res.render(archivo, {
    //   productSent: product,
    //   products: products,
    // });
    */
  },

  // Method to update
  update: (req, res) => {
    db.Product.update(
      {
        users_id: req.session.userLogged.id,
        genre_id: req.body.genre,
        product_name: req.body.product_name,
        price: req.body.price,
        discount: req.body.discount,
        producer: req.body.producer,
        product_description: req.body.descriptionProduct,
        product_image: "x", //req.file.filename,
        popularity: 0,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.redirect("/products/edit/");

    /* OLD METHOD JSON 
    let product = products.find((product) => {
      return product.id == id;
    });

    if (req.file) {
      let editedProduct = {
        id: id,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        genre: req.body.genre,
        descriptionProduct: req.body.descriptionProduct,
        descriptionProducer: req.body.descriptionProducer,
        imageProduct: req.body.descriptionProduct,
        imageProducer: "6_singular_sounds.jpg",
        popularity: req.body.popularity,
      };

      // Array modification with the edited product 
      products.forEach((producto, index) => {
        if (producto.id == id) {
          products[index] = editedProduct;
        }
      });

      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

      res.redirect("/products/store");
    } else {
      let archivo = path.join(__dirname, "../views/products/product-edit-form");  
      res.render(archivo, {
        productSent: product,
        products: products,
      });
    };
    */
  },

  // Delete - Method to erase a registry from DB
  destroy: (req, res) => {
    db.Product.destroy({
      where: { id: req.params.id },
    });

    res.redirect("/products/edit/");

    /* OLD METHOD JSON 
    // Delete product that was brought by the req
    let id = req.params.id;
    // New array with filter method - excludes the desired ID and overwrites the JSON //
    let finalProducts = products.filter((product) => {
      return product.id != id;
    });

    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(finalProducts, null, " ")
    );
    res.redirect("/store");*/
  },
};

module.exports = productsController;
