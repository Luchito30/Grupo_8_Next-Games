const express = require('express');
const {login,register} = require('../controllers/userController');

const router = express.Router();

/* /users */
router.get('/login', login)
router.get('/register', register)

module.exports = router;