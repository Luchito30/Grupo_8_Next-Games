const express = require('express');

const {login,register,processLogin,processRegister,profile,update,logout,removeuserConfirm,removeusers,ProcessAdmin,registerAdmin,recuperarContraseña} = require('../controllers/userController');
const checkUser = require('../middlewares/checkUser');
const checkUserLogin = require('../middlewares/checkUserLogin');
const checkAdmin = require('../middlewares/checkAdmin');
const { uploadperdilImages } = require('../middlewares/uploadPerfil');
const { registerUserValidator, loginUserValidator } = require('../validations');

const router = express.Router();

/* /users */
router.get('/login',checkUser,login);
router.post('/login', loginUserValidator,processLogin);

router.get('/register',checkUser,register);
router.post('/register',uploadperdilImages.single("image"),registerUserValidator, processRegister);

router.get('/recuperarPassword',checkUser, recuperarContraseña);

router.get("/createAdmin", checkAdmin, registerAdmin);
router.post("/createAdmin",uploadperdilImages.single("image"),registerUserValidator,ProcessAdmin)

router.get('/profile/:id',checkUserLogin, profile);

router.get("/removeuser/:id", checkAdmin ,removeuserConfirm);
router.delete("/removeuser/:id", removeusers);

router.put('/update',update);
router.get('/logout',checkUserLogin,logout);

module.exports = router;