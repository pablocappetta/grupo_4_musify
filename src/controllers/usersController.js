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
};

module.exports = usersController;
