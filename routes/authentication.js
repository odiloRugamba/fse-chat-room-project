//importing core node file


//importing third party files
const express = require('express');


//importing my files
const AuthenticationControllers = require("../controllers/authentication");


const router = express.Router();
//sign in
router.get('/signin', AuthenticationControllers.getSignIn);
router.post('/signin', AuthenticationControllers.postSignIn);

// sign up
router.get('/signup', AuthenticationControllers.getSignUp);
router.post('/signup', AuthenticationControllers.postSignUp);


// sign out
router.get('/signout', AuthenticationControllers.getsignOut);

module.exports = router;


