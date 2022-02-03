/* Package used */
const fs = require("fs"); // utilizo libreria path para obtener la ruta
const path = require("path");
const modelUsers = require("../model/modelUsers"); /* Function related to the user -> JSON */
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

// ---------------------------------------------------------------------------------
// use Database
// ---------------------------------------------------------------------------------

let db = require("../database/models");
const Op = db.Sequelize.Op;
const { join } = require("path");

/* object: usersController */
const usersController = {
  register: (req, res) => { 
    let file = path.join(__dirname, "../views/users/register");

    db.UserCategory.findAll().then(function (usersCategory) {
      res.render(file, { usersCategory: usersCategory });
    });
  },

  signup: (req, res) => { 
    let file = path.join(__dirname, "../views/users/register");  
    const validation = validationResult(req);                    

    if(validation.errors.length > 0)
    {
      db.UserCategory.findAll()
      .then(function (usersCategory){ 
        return res.render(file, {
          usersCategory: usersCategory,
          errors: validation.errors,
          oldData: req.body
        });
      })   
    }
    else
    {
      db.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),             // Encryption hash 10 characters
        description_producer: req.body.description_producer,
        image_producer: req.file.filename,
        category_id: req.body.category,
      })
      .then(function(){
        res.redirect("/")
      })
    }
  },

  login: (req, res) => {
    let file = path.join(__dirname, "../views/users/login");
    res.render(file);
  },

  loginProcess: (req, res) => {
    let file = path.join(__dirname, "../views/users/login");
    const validation = validationResult(req);

    db.User.findAll()
      .then(function (users) {
        let array = JSON.parse(JSON.stringify(users)); // Transform data to Array
        const userToLogin = array.filter(function (user) {
          if (user.email == req.body.email) {
            return user;
          }
        });

        // Put errors in login form
        if (validation.errors.length > 0) {
          res.render(file, {
            errors: validation.errors,
            oldData: req.body,
          });
        }
        else
        {
          if (userToLogin) {
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin[0].password);
            if (passwordOk) {
              // Security process - erasing psw from user session
              delete userToLogin.password;
              req.session.userLogged = userToLogin[0];

              if (req.body.remember_user) {
                res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
              }

              return res.redirect("/profile"); /* Redirect URL */
            }
          }
        }
      });
  },

  profile: (req, res) => {
    let file = path.join(__dirname, "../views/users/userAccount/user-profile");
    return res.render(file, {
      user: req.session.userLogged /* Receive profile logged */,
    });
  },

  editProfile: (req, res) => {
    let file = path.join(__dirname,"../views/users/userAccount/user-edit-form");

    db.User.findByPk(req.session.userLogged.id).then(function (user) {
      res.render(file, { user: user });
    });
  },

  update: (req, res) => {
    const validation = validationResult(req);
    let file = path.join(__dirname, "../views/users/userAccount/user-edit-form");
    let profileFile = path.join(__dirname, "../views/users/userAccount/user-profile");

      // Put errors in profile edit form
      if (validation.errors.length > 0) {
        db.User.findByPk(req.session.userLogged.id).then(function (user) {
          res.render(file, {
            errors: validation.errors,
            oldData: req.body,
            user: user,
          });
        });
      }
      else
      {
        db.User.update(
          {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10), // Encryption hash 10 characters
            description_producer: req.body.description_producer,
            image_producer: req.file.filename,
            // category_id : req.body.category
          },
          {
            where: { id: req.params.id },
          }
        );
        
        // update logger user and change picture
        req.session.userLogged.first_name = req.body.first_name;
        req.session.userLogged.last_name = req.body.last_name;
        req.session.userLogged.email = req.body.email; 
        req.session.userLogged.description_producer = req.body.description_producer;
        req.session.userLogged.image_producer = req.file.filename; 

        res.redirect("/profile");

      }
  },

  // Delete - Method to erase a registry from DB
  destroy: (req, res) => {
    db.User.destroy({
      where: { id: req.params.id },
    });

    res.redirect("/logout");
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },

  // ###############################   API   ##################################### //

  // --- List method FOR API ---
  list: (req, res) => {
    db.User.findAll()
      .then((users) => {
        //  JSON sends data in this format in order to allow API consumption  \\

        // ·························   User selection loop    ························· \\

        let propUsers = () => {
          let selectedUsers = [];
          for (let i = 0; i < users.length; i++) {
            selectedUsers.push({
              id: users[i].id,
              user_full_name: `${users[i].first_name} ${users[i].last_name}`,
              email: users[i].email,
              details: `http://localhost:42133/products/api/${users[i].id}`,
            });
          }
          return selectedUsers;
        };

        // ·························   .then() FUNCTION RETURN    ························· \\

        return res.status(200).json({
          count: users.length,
          products: propUsers(),
          status: 200,
        });
      })
      .catch((err) => console.log(err));
  },

  // --- Show method FOR API --- \\
  show: (req, res) => {
    db.User.findByPk(req.params.id, { include: [{ association: "UserCategory" }] })
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
  // id, first_name, last_name, email, password, description_producer - NO
  // image_producer - NO, category_id

  // EXTRA
  // Use DDBB consulting with association (.findAll(X, include))

  // PENDING ISSUES:
  // 

  // ######################################################################### //
};

module.exports = usersController;
