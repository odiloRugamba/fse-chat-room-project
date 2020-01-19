const bcrypt = require('bcryptjs');

const User = require('../models/user');
//sign in
exports.getSignIn = (req, res, next) => {
    console.log("Sign in served");
    res.render('signin');
} 
exports.postSignIn = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    User.findOne({where: {username: username}})
        .then(user => {
            bcrypt.compare(password, user.password)
                .then(match => {
                    if(!match){
                        console.log(match);
                        return res.render('signin', {
                            message: 'username and password do not match',
                            type: 'error'
                        });
                    }
                    req.session.loggedIn = true;
                    req.session.user = user.id;
                    res.redirect('/');
                })
                .catch(err => {
                    console.log(err);
                })
            
        })
        .catch(err => {
            console.log(err);
        });
} 


//sign up

exports.getSignUp = (req, res, next) => {
    console.log("Sign in served");
    res.render('signup');
} 
exports.postSignUp = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    let err;
    if(password !== confirmPassword){
        err = 'Password mismatch';
        return res.render('signup',{ message: err, type: 'error' });
    }

    User.findAll({where: {username: username}})
        .then(user => {
            if(user.length > 0)
            {
                err = 'Username taken';
                res.render('signup',{ message: err, type: 'error' });
            }
            else{
                return bcrypt.hash(password, 12);
            }
        })
        .then(password => {
            User.create({username: username,password: password});
            res.status(202).redirect('/auth/signin');
        })
        .catch(err => {
            console.log(err);
        })

    
} 

exports.getsignOut = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/auth/signin');
    })
} 
