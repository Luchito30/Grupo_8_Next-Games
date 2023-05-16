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
    .notEmpty().withMessage('La dirección es obligatoria').bail()
    .isLength({ min: 2 }).withMessage('Mínimo dos letras').bail()
    .matches(/^[a-zA-Z0-9\s]+$/).withMessage('No se permiten caracteres especiales en la dirección'),

    check('city')
    .notEmpty().withMessage('La ciudad es obligatoria').bail()
    .isLength({ min: 2 }).withMessage('Mínimo dos letras').bail()
    .isAlpha('es-ES', {
      ignore: " "
    }).withMessage('Solo caracteres alfabéticos'),

    check('province')
    .notEmpty().withMessage('La provincia es obligatoria').bail()
    .isLength({ min: 2 }).withMessage('Mínimo dos letras').bail()
    .isAlpha('es-ES', {
      ignore: " "
    }).withMessage('Solo caracteres alfabéticos'),

    check('zipCode')
  .notEmpty().withMessage('El código postal es obligatorio').bail()
  .isNumeric().withMessage('Solo se permiten números en el código postal').bail()
  .isLength({ min: 2, max: 8 }).withMessage('El código postal debe tener entre 2 y 8 dígitos')
];
