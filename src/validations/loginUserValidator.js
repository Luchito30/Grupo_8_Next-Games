const {check, body} = require('express-validator');
const db = require('../database/models');
const {compareSync} = require('bcryptjs');

module.exports = [
    check('useremail')
        .notEmpty().withMessage('El Usuario o Email es obligatorio'),
    
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            return db.User.findOne({
                where : {
                    email : req.body.email
                }
            }).then(user => {
                if(!user || !compareSync(value, user.password)){
                    return Promise.reject()
                }
            }).catch(error => Promise.reject('Credenciales inválidas'))
           
        })
]