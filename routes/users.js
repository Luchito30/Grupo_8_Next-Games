const express = require('express');
const {login,register,create} = require('../controllers/userController');

const router = express.Router();

/* /users */
router.get('/login', login),


router.get('/register', register),
router.post('/register', create)
module.exports = router;