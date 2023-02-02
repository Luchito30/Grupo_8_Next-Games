const express = require('express');
const {carrito,detalleproducto,edicion, crearItem} = require('../controllers/productController');

const router = express.Router();


router.get('/carrito', carrito)
router.get('/detalle-producto', detalleproducto)
router.get('/edicion', edicion)
router.get('/crear-item', crearItem)

module.exports = router;