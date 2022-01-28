const userMiddleware = {

        /* if exist user logged => no show register form or user form*/
        guestMiddleware: (req, res, next) => { 
            if (req.session.userLogged) {               
                return res.redirect('/profile');
            }
            next();                                  
        },

        /* if the user is not logged => redirect to obtain the session correctly */
        authMiddleware: (req, res, next) => {
            if (!req.session.userLogged) {
                return res.redirect('/login');
            }
            next();
        }      
        
    }

module.exports = userMiddleware;