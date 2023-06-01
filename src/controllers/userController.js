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
                        image: req.file ? req.file.filename : "userdefault.png",
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
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            db.User.findByPk(req.session.userLogin.id, {
                attributes: ['firstName', 'LastName', 'userName', 'email', 'image'],
                include: [
                    {
                        association: 'address',
                        attributes: ['address', 'municipio', 'province', 'zipCode', 'localidad', 'codArea', 'telefono']
                    }
                ],
            })
                .then(user => {
                    return res.render('users/profile', {
                        title: "Next Games | Perfil de usuario",
                        user,
                    });
                })
                .catch(error => console.log(error));
        } else {
            db.User.findByPk(req.session.userLogin.id, {
                attributes: ['firstName', 'LastName', 'userName', 'email', 'image'],
                include: [
                    {
                        association: 'address',
                        attributes: ['address', 'municipio', 'province', 'zipCode', 'localidad', 'codArea', 'telefono']
                    }
                ],
            })
                .then(user => {
                    return res.render('users/profile', {
                        title: "Next Games | Perfil de usuario",
                        user,
                        errors: errors.mapped(),
                        old: req.body,
                    });
                })
                .catch(error => console.log(error));
        }
    },
    updateUser: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {


            const { firstName, LastName, userName, address, municipio, province, zipCode, localidad , codArea, telefono } = req.body;
            const { id } = req.session.userLogin;

            db.User.findByPk(id)
                .then(user => {
                    const addressUpdate = db.Address.update(
                        {
                            address: address ? address.trim() : null,
                            province: province ? province : null,
                            zipCode: zipCode ? zipCode : null,
                            localidad: localidad ? localidad : null,
                            municipio: municipio ? municipio : null,
                            codArea: codArea ? codArea : null, 
                            telefono: telefono ? telefono.trim() : null
                        },
                        {
                            where: {
                                id: user.addressId
                            }
                        }
                    );
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
                    );

                    Promise.all([addressUpdate, userUpdate])
                        .then(() => {
                            req.session.userLogin = {
                                id,
                                firstName: firstName.trim(),
                                image: req.file ? req.file.filename : user.image,
                                rol: user.rolId
                            };

                            if (req.file && fs.existsSync('public/images/users/' + user.image)) {
                                fs.unlinkSync('public/images/users/' + user.image);
                            }

                            req.session.message = "Datos actualizados";
                            return res.redirect(`/users/profile/${id}?message=Datos%20actualizados`);

                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
        } else {
            db.User.findByPk(req.session.userLogin.id, {
                attributes: ['firstName', 'LastName', 'userName', 'email', 'image'],
                include: [
                    {
                        association: 'address',
                        attributes: ['address', 'municipio', 'province', 'zipCode', 'localidad', 'codArea', 'telefono']
                    }
                ],

            })
                .then(user => {
                    return res.render('users/profile', {
                        title: "Next Games | Perfil de usuario",
                        user,
                        errors: errors.mapped(),
                    })
                })
                .catch(error => console.log(error))
        }
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
    recuperarContraseña: (req, res) => {
        return res.render('users/recuperarContraseña', {
            title: "Next Games | Recuperar contraseña"
        });
    },
    removeuserConfirm: (req, res) => {
        const { id } = req.params;

        db.User.findByPk(id).then((user) => {
            return res.render("users/removeuserConfirm", {
                ...user.dataValues,
                title: "Next Games | Advertencia"
            });
        })
    },
    removeusers: async (req, res) => {
        const { id } = req.params;

        try {
            const user = db.User.findByPk(id, {
                include: { all: true }
            })

            if (user.image) {
                fs.existsSync(`public/users/products/${product.image}`) &&
                    fs.unlinkSync(`public/users/products/${product.image}`);
            }

            await db.User.destroy({
                where: {
                    id
                }
            })

            return res.redirect("/admin/dashboardUser");
        } catch (error) {
            console.log(error);
            return res.redirect("/admin/dashboardUser");
        }
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
                        image: req.file ? req.file.filename : "userdefault.png",
                        rolId: 1,
                        addressId: address.id
                    }).then(() => {

                        return res.redirect('/admin/dashboardUser');

                    })
                })
                .catch(error => console.log(error))
        } else {
            return res.render('users/crearAdmin', {
                title: "Next Games | Crear Administrador",
                errors: errors.mapped(),
                old: req.body
            });
        }
    },
    term: (req,res) => {
        return res.render('users/term', {
            title: "Next Games | Terminos y Condiciones"
        });
    },
    privacidad: (req,res) => {
        return res.render('users/privacidad', {
            title: "Next Games | Politica de Privacidad"
        });
    },
    devolucion: (req,res) => {
        return res.render('users/devolucion', {
            title: "Next Games | Política de Devoluciones"
        });
    },
    favorites: (req,res) => {
        return res.render('users/favorites', {
            title: "Next Games | Favoritos"
        });
    },
}

