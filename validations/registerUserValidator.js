
const {check,body} = require('express-validator');
const{}= require('../data/user.json')

module.exports =[
    check('firstName')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
        min:2
    }).withMessage('Mínimo dos letras').bail()
    .isAlpha('es-ES',{
        ignore:" "
    }).withMessage('Solo caracteres alfabéticos'),


    check('lastName')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isLength({
        min:2
    }).withMessage('Mínimo dos letras').bail()
    .isAlpha('es-ES',{
        ignore:" "
    }).withMessage('Solo caracteres alfabéticos'),


    body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email con formato válido')
    .custom((value,{req}) =>{
        let user = JSON.parse(fs.readFileSync(path.resolve(__dirname,json) )).find(user=>user.email===value)
        return !user
    }).withMessage('El email ya se encuentra registrado'),
    
    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({
            min: 6,
            max : 12
        }).withMessage('La contraseña debe tener entre 6 y 12 caracteres')
    
   
    
    
]