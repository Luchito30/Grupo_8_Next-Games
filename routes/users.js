const express = require('express');
const {login,register} = require('../controllers/userController');

const router = express.Router();

/* /users */
router.get('/login', login),
router.post('/login', login)

router.get('/register', register)
router.post('/register', register)
module.exports = router;