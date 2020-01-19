//importing my own files
const User = require('../models/user');


exports.check = (req, res, next) => {
    if(req.session.loggedIn == true && typeof req.session.user != 'undefined' ){
        User.findByPk(req.session.user)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        });
    }
    else
        return res.redirect('/auth/signin');  
} 