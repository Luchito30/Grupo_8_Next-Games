const {check, body} = require('express-validator');
const { readJSON} = require("../data");;
const {compareSync} = require('bcryptjs');

module.exports = [
    check('useremail')
        .notEmpty().withMessage('El Usuario o Email es obligatorio'),
    
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            let user = readJSON('user.json').find(user => user.email === req.body.useremail || user.userName === req.body.useremail && compareSync(value, user.password));
            return user
        }).withMessage('Credenciales inválidas')
]