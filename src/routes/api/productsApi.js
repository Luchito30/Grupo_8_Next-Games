const router = require('express').Router();
const {index,detail} = require('../../controllers/api/productApiController') ;

router
.get('/', index)
.get('/:id', detail)

module.exports = router;