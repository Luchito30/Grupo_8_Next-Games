const fs = require('fs');

const { validationResult } = require('express-validator');

const { hashSync } = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");

module.exports = {

    register: (req, res) => {
        return res.render('users/register', {
            title: "Next Games | Registro"

        });

    },
    processRegister: (req, res) => {

        const errors = validationResult(req);

        if (req.fileValidationError) {
            errors.errors.push({
                value: "",
                msg: req.fileValidationError,
                param: "images",
                location: "files"
            })
        }

        if (errors.isEmpty()) {

            const { firstName, LastName, email, password, userName, image } = req.body

            db.Address.create()
                .then(address => {
                    db.User.create({
                        firstName: firstName.trim(),
                        LastName: LastName.trim(),
                        email: email.trim(),
                        password: hashSync(password, 10),
                        userName: userName.trim(),
                        image: req.file ? req.file.filename : "default-image.png",
                        rolId: 2,
                        addressId: address.id
                    }).then(() => {

                        return res.redirect('/users/login');

                    })
                })
                .catch(error => console.log(error))
        } else {
            return res.render('users/register', {
                title: "Next Games | Register",
                errors: errors.mapped(),
                old: req.body
            });
        }
    },

    login: (req, res) => {
        return res.render('users/login', {
            title: "Next Games | Login"
        });
    },
    processLogin: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            db.User.findOne({
                where: {
                    [Op.or]: [
                        {
                            email: req.body.useremail
                        },
                        {
                            userName: req.body.useremail
                        }
                    ]

                },
            })
                .then(({ id, firstName, image, rolId }) => {

                    req.session.userLogin = {
                        id,
                        firstName,
                        image,
                        rol: rolId
                    };

                    if (req.body.remember) {
                        res.cookie('usernextgames', req.session.userLogin, { maxAge: 1000 * 60 * 10 })
                    }

                    return res.redirect('/')
                })
                .catch(error => console.log(error))
        } else {
            return res.render('users/login', {
                title: "Next Games | Login",
                errors: errors.mapped()
            })
        }
    },
    profile: (req, res) => {
        db.User.findByPk(req.session.userLogin.id, {
            attributes: ['firstName', 'LastName', 'userName', 'email', 'image'],
            include: [
                {
                    association: 'address',
                    attributes: ['address', 'city', 'province', 'zipCode']
                }
            ],

        })
            .then(user => {
                return res.render('users/profile', {
                    title: "Next Games | Perfil de usuario",
                    user,
                })
            })
            .catch(error => console.log(error))
    },
    update: (req, res) => {
        const { firstName, LastName, userName, address, city, province, zipCode } = req.body
        const { id } = req.session.userLogin;

        db.Usuario.findByPk(id)
            .then(user => {
                const addressUpdate = db.Address.update(
                    {
                        address: address ? address.trim() : null,
                        city: city ? city.trim() : null,
                        province: province ? province.trim() : null,
                        zipCode: zipCode ? zipCode : null
                    },
                    {
                        where: {
                            id: user.addressId
                        }
                    }
                )
                const userUpdate = db.User.update(
                    {
                        firstName: firstName.trim(),
                        LastName: LastName.trim(),
                        userName: userName.trim(),
                        image: req.file ? req.file.filename : user.image
                    },
                    {
                        where: {
                            id
                        }
                    }
                )

                Promise.all(([addressUpdate, userUpdate]))
                    .then(() => {

                        (req.file && fs.existsSync('public/images/users/' + user.image)) && fs.unlinkSync('public/images/users/' + user.image)

                        req.session.message = "Datos actualizados"
                        return res.redirect('/users/profile')
                    })
            }).catch(error => console.log(error))
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("usernextgames")
        return res.redirect('/')
    },
    list: (req, res) => {

        db.User.findAll({
            include: ['address', 'rol']
        })
            .then(users => {
                return res.render('users/users', {
                    users
                })
            })
            .catch(error => console.log(error))
    },
    removeuserConfirm: (req, res) => {
        const users = readJSON('user.json');
        const id = req.params.id;
        const user = users.find(user => user.id === +id);

        return res.render("users/removeuserConfirm", {
            ...user,
            title: "Next Games | Advertencia"
        })
    },
    recuperarContraseña: (req, res) => {
        return res.render('users/recuperarContraseña', {
            title: "Next Games | Recuperar contraseña"
        });
    },
    removeusers: (req, res) => {
        const users = readJSON('user.json');
        const id = req.params.id;
        const usersModified = users.filter(user => user.id !== +id);

        writeJSON("user.json", usersModified);
        return res.redirect("/admin/dashboardUser")
    },
    registerAdmin: (req, res) => {
        return res.render('users/crearAdmin', {
            title: "Next Games | Crear Administrador"

        });

    },
    ProcessAdmin: (req, res) => {

        const errors = validationResult(req);

        if (req.fileValidationError) {
            errors.errors.push({
                value: "",
                msg: req.fileValidationError,
                param: "images",
                location: "files"
            })
        }

        if (errors.isEmpty()) {

            const { firstName, LastName, email, password, userName, image } = req.body

            db.Address.create()
                .then(address => {
                    db.User.create({
                        firstName: firstName.trim(),
                        LastName: LastName.trim(),
                        email: email.trim(),
                        password: hashSync(password, 10),
                        userName: userName.trim(),
                        image: req.file ? req.file.filename : "default-image.png",
                        rolId: 1,
                        addressId: address.id
                    }).then(() => {

                        return res.redirect('/admin/dashboardUser');

                    })
                })
                .catch(error => console.log(error))
        } else {
            return res.render('users/crearAdmin',{
                title: "Next Games | Crear Administrador",
                errors : errors.mapped(),
                old:req.body
            });
        }
    },


}

