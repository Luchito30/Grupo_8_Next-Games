const express = require('express');
const {carrito,detalleproducto,edicion, crearItem,store,index} = require('../controllers/productController');

const router = express.Router();

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 
router.get('/carrito', carrito)
router.get('/detalle-producto', detalleproducto)
router.get('/edicion', edicion)

/*** CREATE ONE PRODUCT ***/
router.get('/createItem/', crearItem);
router.post('/createItem', store)
module.exports = router;