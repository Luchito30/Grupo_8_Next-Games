const { check } = require('express-validator');
const db = require('../database/models');
const { Op } = require("sequelize");

module.exports = [
  check("firstName")
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
      min: 2
    }).withMessage('Mínimo dos letras').bail()
    .isAlpha('es-ES', {
      ignore: " "
    }).withMessage('Solo caracteres alfabéticos'),
    

  check('LastName')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isLength({
      min: 2
    }).withMessage('Mínimo dos letras').bail()
    .isAlpha('es-ES', {
      ignore: " "
    }).withMessage('Solo caracteres alfabéticos'),

  check('userName')
    .notEmpty().withMessage('Debes escribir un usuario').bail()
    .isLength({
      min: 2
    }).withMessage('Mínimo dos letras').bail()
    .custom((value, { req }) => {
      if (req.body.submit) {
        return db.User.findOne({
          where: {
            userName: value
          }
        }).then(user => {
          if (user) {
            return Promise.reject();
          }
        }).catch((error) => {
          console.log(error);
          return Promise.reject('El usuario ya se encuentra registrado');
        });
      } else {
        return Promise.resolve();
      }
    }),

    check('address')
    .isLength({ min: 2 }).withMessage('Mínimo dos letras').bail()
    .matches(/^[a-zA-Z0-9\s]+$/).withMessage('No se permiten caracteres especiales en la dirección'),

    check('province')
    .notEmpty().withMessage('Se debe Elejir una provincia'),

    check('municipio')
    .notEmpty().withMessage('Se debe Elejir un Municipio'),

    check('localidad')
    .notEmpty().withMessage('Se debe Elejir una localidad'),

    check('codArea')
    .isNumeric().withMessage('Solo se permiten números en el código de area').bail()
    .isLength({ min: 2, max: 4 }).withMessage('El código de area debe tener entre 2 y 4 dígitos'),

    check('telefono')
    .isNumeric().withMessage('Solo se permiten números en el telefóno').bail()
    .isLength({ min: 4, max: 10 }).withMessage('El telefóno debe tener entre 4 y 10 dígitos'),
    
    check('zipCode')
  .isNumeric().withMessage('Solo se permiten números en el código postal').bail()
  .isLength({ min: 2, max: 8 }).withMessage('El código postal debe tener entre 2 y 8 dígitos')
];
