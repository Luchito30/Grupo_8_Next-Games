const express = require('express');
const {carrito,detalleproducto,edicion, createItem,storeMainImage,index,update,removeConfirm,remove,getFromSubcategory, getFromCategory} = require('../controllers/productController');
const checkAdmin = require('../middlewares/checkAdmin');
const {uploadproductImages} = require("../middlewares/upload");
const { productValidator } = require('../validations');
const checkUser = require('../middlewares/checkUser');


const router = express.Router();

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 
router.get('/carrito', carrito);
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
router.get("/remove/:id",checkAdmin,removeConfirm);
router.delete("/remove/:id",remove);

module.exports = router;

