const express = require('express')
const router = express.Router()
const {listUser,detail,registerUser, registerUserAdmin,deleteAllUser,deleteUser,editUser,updateUser} = require('../../controllers/api/apiUserController')
const { uploadperdilImages } = require('../../middlewares/uploadPerfil');
const { registerUserValidator} = require('../../validations');


/* /api/users  */ 
router.get('/', listUser)
router.get('/:id',detail)
router.post('/register',uploadperdilImages.single("image"),registerUserValidator,registerUserValidator,registerUser)
router.post('/registeradmin',uploadperdilImages.single("image"),registerUserValidator,registerUserValidator,registerUserAdmin)
router.get('/edit/:id',editUser)
router.post('/edit/:id',uploadperdilImages.single("image"),updateUser)
router.get('/delete/:id',deleteUser)
router.delete('/delete/:id',deleteAllUser)

module.exports = router
