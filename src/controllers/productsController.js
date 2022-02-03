// ··································· IMPORTS ············································ //

const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
let db = require("../database/models");
let port = require("../../app.js");

// ························································································ //

const Op = db.Sequelize.Op;

// ························································································ //

const productsFilePath = path.join(
  __dirname,
  "../database/productsDataBase.json"
);
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

// ························································································ //

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

    let file = path.join(
      __dirname,
      "../views/products/productsByUser/product-create-form"
    );
    const validation = validationResult(req);

    /* WITH DATABASE */
    let reqProduct = db.Product.findAll();
    let reqGenres = db.Genre.findAll();

    // Create product validation form
    if (validation.errors.length > 0) {
      Promise.all([reqProduct, reqGenres]).then(function ([products, genres]) {
        res.render(file, {
          products: products,
          genres: genres,
          errors: validation.errors,
          oldData: req.body,
        });
      });
    } else {
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
      res.redirect("/products/store");
    }
  },

  // ###############################   API   ##################################### //

  // --- List method FOR API ---
  list: (req, res) => {
    db.Product.findAll({ include: [{ association: "genre" }] })
      .then((products) => {
        //  JSON sends data in this format in order to allow API consumption  \\

        // ·························   countByCategory loop    ·························  \\

        let genreID = () => {
          let generos = [];

          for (let i = 0; i < products.length; i++) {
            generos.push(products[i].genre.genre_name);
          }

          let generosReducer = generos.reduce((accumulator, current) => {
            accumulator[current] = (accumulator[current] || 0) + 1;
            return accumulator;
          }, {});

          return generosReducer;
        };

        // ·························   Product selection loop    ························· \\

        let propProducts = () => {
          let selectedProducts = [];
          for (let i = 0; i < products.length; i++) {
            selectedProducts.push({
              id: products[i].id,
              product_name: products[i].product_name,
              product_description: products[i].product_description,
              genre_name: products[i].genre.genre_name,
              details: `http://localhost:42133/products/api/${products[i].id}`,
            });
          }
          return selectedProducts;
        };

        // ·························   .then() FUNCTION RETURN    ························· \\

        return res.status(200).json({
          count: products.length,
          countByCategory: genreID(),
          products: propProducts(),
          status: 200,
        });
      })
      .catch((err) => console.log(err));
  },

  // --- Show method FOR API --- \\
  show: (req, res) => {
    db.Product.findByPk(req.params.id, { include: [{ association: "genre" }] })
      .then((product) => {
        return res.status(200).json({
          data: {
            id: product.id,
            product_name: product.product_name,
            product_description: product.product_description,
            producer: product.producer,
            price: product.price,
            discount: product.discount,
            genre_name: product.genre.genre_name,
            image: `http://localhost:42133/products/api/${product.id}`, // must UPDATE for IMAGE URL
          },
          status: 200,
        });
      })
      .catch((err) => console.log(err));
  },

  // --- Store method for creating a resource in the API --- \\
  store: (req, res) => {
    db.Product.create(req.body)
      .then((product) => {
        return res.status(200).json({
          data: product,
          status: 200,
          created: "Yes.",
        });
      })
      .catch((err) => console.log(err));
  },

  // --- Delete method for the API --- \\
  delete: (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((product) => {
        return res.json(product);
      })
      .catch((err) => console.log(err));
  },

  // --- Search method for the API --- \\
  search: (req, res) => {
    db.Product.findAll({
      where: {
        // Like operator to search for a product by its name using our wild card operator (%)
        product_name: { [Op.like]: "%" + req.query.keyword + "%" },
      },
    })
      .then((product) => {
        if (product.length > 0) {
          return res.status(200).json(product);
        }
        return res
          .status(200)
          .json("There are no products that match your search.");
      })
      .catch((err) => console.log(err));
  },

  // COLUMNS:
  // product_name, price, discount - NO, producer, product_description - NO
  // product_image - NO, popularity- NO, users_id, genre_id

  // EXTRA
  // Use DDBB consulting

  // PENDING ISSUES:
  // URL for image (products/api/:id) -- pending review

  // ######################################################################### //

  // --- List products BY USER ---
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
    let file = path.join(
      __dirname,
      "../views/products/productsByUser/product-edit-form"
    ); // path view
    const validation = validationResult(req);

    /* WITH DATABASE */
    let reqProduct = db.Product.findAll();
    let reqGenres = db.Genre.findAll();

    console.log(validation);

    // Edit product validation form
    if (validation.errors.length > 0) {
      Promise.all([reqProduct, reqGenres]).then(function ([product, genres]) {
        res.render(file, {
          product: product,
          genres: genres,
          errors: validation.errors,
          oldData: req.body,
        });
      });
    } else {
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
      res.redirect("/profile");
    }

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
