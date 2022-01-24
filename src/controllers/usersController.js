/* Package used */
const fs = require("fs");                       // utilizo libreria path para obtener la ruta
const path = require("path");
const modelUsers = require("../model/modelUsers");    /* Function related to the user -> JSON */
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

// ---------------------------------------------------------------------------------
// use Database
// ---------------------------------------------------------------------------------
let db = require("../database/models");


/* Define constant */
const users = modelUsers.getData();          /* JSON -> Object array */

/* object: usersController */
const usersController = {

  register: (req, res) => {
    let file = path.join(__dirname, "../views/users/register");
    res.render(file, {users:users});
  },

  signup: (req, res) => {

    const resultValidation = validationResult(req);

    let file = path.join(__dirname, "../views/users/register");

    /* put errors in register form */
		if (resultValidation.errors.length > 0) {
      
			return res.render(file, {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

    /* check if the mail is registered */
    if (modelUsers.findByField('email',req.body.email))
    {
        /* msg error email registered  */
        return res.render(file, {
          errors : {
            msg : "email is already exist"
          },
          oldData: req.body
        });
    } 
    else
    {

      console.log(req.file);
      /* create new user */
      const newUser = {
        ...req.body,                                            /* Get body object */ 
        password: bcryptjs.hashSync(req.body.password, 10),     /* Encryption hash 10 characters */
        image: req.file.filename                                /* image */
      };
      modelUsers.create(newUser);
    }
      // Redirect to main form
      res.redirect("/");
  },

  login: (req, res) => {
    let file = path.join(__dirname, "../views/users/login");
    res.render(file);
  },

  loginProcess: (req,res)=>{
    let userToLogin = modelUsers.findByField('email',req.body.email);

    let file = path.join(__dirname, "../views/users/login");

    /* check email user exist */
    if (userToLogin){ 
      let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
      if (passwordOk)
      {
        delete userToLogin.password;                      /* the password is removed for security */
        req.session.userLogged = userToLogin;             /* Copy user to session */
        
        /* key-value */
        if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}
        
        return res.redirect("/profile");                  /* Redirect URL */
      }

        /* msg error password  */
        return res.render(file, {
          errors : {
            msg : "password incorrect"
          }
        });

    }
    
    /* msg error email */
    return res.render("../views/users/login", {
      errors : {
        msg : "This email no is register"
      }
    });

  },

  profile:(req,res) => {
    let file = path.join(__dirname, "../views/users/userProfile");
    return res.render(file, {
      user: req.session.userLogged       /* Receive profile logged */
    });
  },

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},


  // ---------------------------------------------------------------------------------
  test: (req, res) => {
   /* db.UserCategory.findAll()
      .then(function(UserCategory){
        return res.render ("test", {UserCategory : UserCategory})
      })*/
  }



};

module.exports = usersController;
