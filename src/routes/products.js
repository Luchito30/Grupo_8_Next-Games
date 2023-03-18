const express = require('express');
const {carrito,detalleproducto,edicion, createItem,storeMainImage,index,update,removeConfirm,remove,notebook,accesorios, consolas,tarjetas,juegos,perifericos,ofertas,ingresos} = require('../controllers/productController');
const {uploadproductImages} = require("../middlewares/upload");
const { productValidator } = require('../validations');


const router = express.Router();

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 
router.get('/carrito', carrito)
router.get('/detalle-producto/:id', detalleproducto)
router.get("/notebook", notebook)
router.get("/accesorios", accesorios)
router.get("/consolas", consolas)
router.get("/tarjetas", tarjetas)
router.get("/juegos", juegos)
router.get("/perifericos", perifericos)
router.get("/insale", ofertas)
router.get("/ingresos", ingresos)

/*** CREATE ONE PRODUCT ***/
router.get('/createItem/', createItem);
router.post('/createItem/',uploadproductImages.fields([{name: 'image'},{name: 'images'}]), productValidator , storeMainImage );

/* EDIT PRODUCT */
router.get('/edicion/:id', edicion);
router.put('/edicion/:id',uploadproductImages.fields([{name: 'image'},{name: 'images'}]),productValidator,update);

/*** Eliminar producto ***/
router.get("/remove/:id",removeConfirm)
router.delete("/remove/:id",remove)

module.exports = router;

