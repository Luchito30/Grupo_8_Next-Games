const router = require('express').Router();
const {index,detail,storeProduct} = require('../../controllers/api/productApiController') ;
const {uploadproductImages} = require("../../middlewares/upload");
const { productValidator } = require('../../validations');

/* /api/products */ 
router
.get('/', index)
.get('/:id', detail)
.post("/create",uploadproductImages.fields([{name: 'image'},{name: 'images'}]), productValidator,storeProduct )



module.exports = router;