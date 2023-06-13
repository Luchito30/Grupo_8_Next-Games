const router = require('express').Router();

const { getOrderPending, addProduct, removeProduct, moreQuantity, lessQuantity, clearCart, statusOrder,guardarCuotas, saveQuantity }
 = require('../../controllers/api/cartApiController');

const {index, detail}
 = require('../../controllers/api/productApiController')

router
.get('/getOrderPending',getOrderPending)
.post('/addProduct',addProduct)
.delete('/removeProduct',removeProduct)
.put('/moreQuantity',moreQuantity)
.put('/lessQuantity',lessQuantity)
.put('/saveQuantity',saveQuantity)
.delete('/clearCart',clearCart)
.put('/statusOrder',statusOrder)
.post('/cuotas',guardarCuotas);


module.exports = router;