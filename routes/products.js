const express = require('express');
const {carrito, detalleproducto, edicion, crearItem, index, update} = require('../controllers/productController');

const router = express.Router();

router.get('/', index);
router.get('/carrito', carrito)
router.get('/detalle-producto', detalleproducto)

/* EDIT PRODUCT */
router.get('/edicion/:id', edicion);
router.put('/edicion/:id', update);

router.get('/crear-item', crearItem)

module.exports = router;