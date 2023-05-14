const router = require('express').Router();
const {index,detail,storeProduct,editProduct,updateProduct} = require('../../controllers/api/productApiController') ;
const {uploadproductImages} = require("../../middlewares/upload");
const { productValidator } = require('../../validations');

/* /api/products */ 
router
.get('/', index)
.get('/:id', detail)
.post("/create",uploadproductImages.fields([{name: 'image'},{name: 'images'}]), productValidator,storeProduct )
.get('/edit/:id', editProduct)
.put('/edit/:id',uploadproductImages.fields([{name: 'image'},{name: 'images'}]), productValidator,updateProduct)


module.exports = router;