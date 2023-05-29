const {check} = require("express-validator");

module.exports = [
    check('name')
    .notEmpty().withMessage("Debe ingresar su nombre").bail()
    .isLength({min:1, max:15}).withMessage("El nombre debe tener entre 1 y 15 caracteres"),

    check('emails')
    .notEmpty().withMessage('Debe ingresar un email').bail()
    .isEmail().withMessage('Debe ser un email con formato válido'),

    check('tel')
    .isNumeric().withMessage('Solo se permiten números en el telefóno').bail()
    .isLength({ min: 4, max: 10 }).withMessage('El telefóno debe tener entre 4 y 15 dígitos'),

    check('province')
    .notEmpty().withMessage('Se debe Elejir una provincia'),

    check('municipio')
    .notEmpty().withMessage('Se debe Elejir un Municipio'),

    check('localidad')
    .notEmpty().withMessage('Se debe Elejir una localidad'),

    check('asunto')
    .notEmpty().withMessage("Debe ingresar el asunto").bail()
    .isLength({min:1, max:50}).withMessage("El asunto debe tener entre 1 y 50 caracteres"),

    check('description')
    .notEmpty().withMessage("Debe ingresar la consulta").bail()
    .isLength({min:1, max:350}).withMessage("La consulta debe tener entre 1 y 350 caracteres"),

]