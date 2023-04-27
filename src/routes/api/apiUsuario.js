const express = require('express')
const router = express.Router()
let {listUser,detail} = require('../../controllers/api/apiUserController')

router.get('/', listUser)
router.get('/:id',detail)

module.exports = router
