const express = require('express');
const {carrito,detalleproducto,edicion, createItem,store,index,update,removeConfirm,remove} = require('../controllers/productController');

const router = express.Router();

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 
router.get('/carrito', carrito)
router.get('/detalle-producto/:id', detalleproducto)

/*** CREATE ONE PRODUCT ***/
router.get('/createItem/', createItem);
router.post('/createItem', store)

/* EDIT PRODUCT */
router.get('/edicion/:id', edicion);
router.put('/edicion/:id', update);

/*** Eliminar producto ***/
router.get("/remove/:id",removeConfirm)
router.delete("/remove/:id",remove)
module.exports = router;