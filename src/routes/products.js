const express = require('express');
const {carrito,detalleproducto,edicion, createItem,storeMainImage,index,update,remove,getFromSubcategory, getFromCategory, confirmRemove} = require('../controllers/productController');
const checkAdmin = require('../middlewares/checkAdmin');
const {uploadproductImages} = require("../middlewares/upload");
const { productValidator } = require('../validations');
const checkUserLogin = require('../middlewares/checkUserLogin');

const router = express.Router();

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 
router.get('/carrito',checkUserLogin, carrito);
router.get('/detalle-producto/:id', detalleproducto);
router.get('/subcategory/:subcategoryId', getFromSubcategory);
router.get('/categorias/:stateId',  getFromCategory);

/*** CREATE ONE PRODUCT ***/
router.get('/createItem/',checkAdmin, createItem);
router.post('/createItem/',uploadproductImages.fields([{name: 'image'},{name: 'images'}]), productValidator , storeMainImage );

/* EDIT PRODUCT */
router.get('/edicion/:id',checkAdmin, edicion);
router.put('/edicion/:id',uploadproductImages.fields([{name: 'image'},{name: 'images'}]),productValidator,update);

/*** Eliminar producto ***/
router.get("/remove/:id",confirmRemove)
router.delete("/remove/:id",remove);

module.exports = router;

