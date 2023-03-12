const express = require('express');
const {login,register,processRegister} = require('../controllers/userController');
const {registerUserValidator} = require('../validations');
const router = express.Router();

/* /users */
router.get('/login', login),


router.get('/register', register),
router.post('/register',registerUserValidator,processRegister)
module.exports = router;