const { check, body } = require('express-validator');

const db = require('../database/models');
module.exports = [
    body('email')
    .isEmail().withMessage('Debe ser un email con formato válido')
    .custom((value, {req}) => {
        return db.NewsLatter.findOne({
            where : {
                email : value
            }
        }).then(user => {
            if(user){
                return Promise.reject()
            }
        }).catch((error) => {
            console.log(error)
            return Promise.reject('El email ya se encuentra registrado')
        })
    }),
]