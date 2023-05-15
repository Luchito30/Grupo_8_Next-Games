const { check } = require('express-validator');
const db = require('../database/models');
const { Op } = require("sequelize");

module.exports = [
  // Validación del nombre
  check("firstName")
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
      min: 2
    }).withMessage('Mínimo dos letras').bail()
    .isAlpha('es-ES', {
      ignore: " "
    }).withMessage('Solo caracteres alfabéticos'),

  // Validación del apellido
  check('LastName')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isLength({
      min: 2
    }).withMessage('Mínimo dos letras').bail()
    .isAlpha('es-ES', {
      ignore: " "
    }).withMessage('Solo caracteres alfabéticos'),

  // Validación del usuario
  check('userName')
    .notEmpty().withMessage('Debes escribir un usuario').bail()
    .isLength({
      min: 2
    }).withMessage('Mínimo dos letras').bail()
    .custom((value, { req }) => {
      // Validar solo si se ha enviado el formulario
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
];
