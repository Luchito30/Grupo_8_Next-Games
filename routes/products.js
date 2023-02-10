const express = require('express');
const {carrito, detalleproducto, edicion, crearItem} = require('../controllers/productController');

const router = express.Router();

// CONTROLLER REQUIRE 
const productController = require('../controllers/productController');

 
router.get('/carrito', carrito)
router.get('/detalle-producto', detalleproducto)

/* EDIT PRODUCT */
router.get('/edicion/:id', productController.edicion);
router.put('/edicion/:id', productController.update);

router.get('/crear-item', crearItem)

module.exports = router;