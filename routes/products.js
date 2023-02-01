const express = require('express');
const {carrito,detalleproducto} = require('../controllers/productController');

const router = express.Router();


router.get('/carrito', carrito)
router.get('/detalle-producto', detalleproducto)

module.exports = router;