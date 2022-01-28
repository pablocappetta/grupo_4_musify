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
    const resultValidation = validationResult(req);

    /* check if the mail is registered */
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10), // Encryption hash 10 characters
      description_producer: "add something",
      image_producer: req.file.filename,
      category_id: req.body.category,
    });

    console.log(resultValidation);

    // put errors in register form
    if (resultValidation.errors.length > 0) {
      db.UserCategory
        .findAll()
        .then(function (usersCategory) {
          return res.render(file, {
            usersCategory : usersCategory,
            errors: resultValidation.mapped(),
            oldData: req.body,
          });
      });
    }

    // Redirect to main form
    res.redirect("/");
  },

  login: (req, res) => {
    let file = path.join(__dirname, "../views/users/login");
    res.render(file);
  },

  loginProcess: (req, res) => {
    let file = path.join(__dirname, "../views/users/login");
    db.User.findAll().then(function (users) {
      let array = JSON.parse(JSON.stringify(users)); // Transform data to Array
      const userToLogin = array.filter(function (user) {
        if (user.email == req.body.email) {
          return user;
        }
      });

      if (userToLogin) {
        let passwordOk = bcryptjs.compareSync(
          req.body.password,
          userToLogin[0].password
        );
        if (passwordOk) {
          delete userToLogin.password;
          req.session.userLogged = userToLogin[0];

          if (req.body.remember_user) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
          }

          return res.redirect("/profile"); /* Redirect URL */
        }

        /* msg error password  */
        return res.render(file, {
          errors: {
            msg: "password incorrect",
          },
        });
      }

      /* msg error email */
      return res.render("../views/users/login", {
        errors: {
          msg: "This email no is register",
        },
      });
    });

    // let userToLogin = modelUsers.findByField('email',req.body.email);
    // let file = path.join(__dirname, "../views/users/login");

    // /* check email user exist */
    // if (userToLogin){
    //   let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
    //   if (passwordOk)
    //   {
    //     delete userToLogin.password;                      /* the password is removed for security */
    //     req.session.userLogged = userToLogin;             /* Copy user to session */

    //     /* key-value */
    //     if(req.body.remember_user) {
    // 			res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
    // 		}

    //     return res.redirect("/profile");                  /* Redirect URL */
    //   }

    //     /* msg error password  */
    //     return res.render(file, {
    //       errors : {
    //         msg : "password incorrect"
    //       }
    //     });

    // }

    // /* msg error email */
    // return res.render("../views/users/login", {
    //   errors : {
    //     msg : "This email no is register"
    //   }
    // });
  },

  profile: (req, res) => {
    let file = path.join(__dirname, "../views/users/userAccount/user-profile");
    return res.render(file, {
      user: req.session.userLogged /* Receive profile logged */,
    });
  },

  editProfile: (req, res) => {
    let file = path.join(
      __dirname,
      "../views/users/userAccount/user-edit-form"
    );

    db.User.findByPk(req.session.userLogged.id).then(function (user) {
      res.render(file, { user: user });
    });
  },

  update: (req, res) => {
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

    res.redirect("/profile/edit/");
  },

  // Delete - Method to erase a registry from DB
  destroy: (req, res) => {
    db.User.destroy({
      where: { id: req.params.id },
    });

    res.redirect("/");
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = usersController;
