const express = require('express');
const {home,carrito,login,register,detalleproducto} = require('../controllers/mainController');

const router = express.Router();

/* GET home page. */
router.get('/', home);
router.get('/login', login)
router.get('/register', register)
router.get('/carrito', carrito)
router.get('/detalle-producto', detalleproducto)

module.exports = router;
