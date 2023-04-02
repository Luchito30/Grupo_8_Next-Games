const {check} = require("express-validator");

module.exports = [
    check("name")
        .notEmpty().withMessage("El nombre del producto es obligatorio").bail()
        .isLength({min:5, max:80}).withMessage("El titulo debe tener entre 5 y 80 caracteres"),

    check("price")
        .notEmpty().withMessage("Se debe indicar un Precio").bail()
        .isInt({min:1}).withMessage("Se deben ingresar numeros positivos"),

    check("discount")
        .isInt({min:0, max:100}).withMessage("Se permite descuento del 0 a 100 porciento"),

    check("category")
        .notEmpty().withMessage("Se debe elejir un estado"),

    check("subCategory")
        .notEmpty().withMessage("Se debe elejir una categoria"),

    check("description")
        .notEmpty().withMessage("Se debe ingresar una descripción al producto").bail()
        .isLength({min:5, max:1000}).withMessage("La descripción debe tener entre 5 y 1000 caracteres")
        
]