const db = require("../database/models");
const { validationResult } = require('express-validator');

module.exports = {
    questions: (req, res) => {
        return res.render("info/questions", {
            title: "Next Games | Preguntas Frecuentes"
        })
    },
    nosotros: (req, res) => {
        return res.render("info/nosotros", {
            title: "Next Games | Sobre nosotros"
        })
    },
    contactanos: (req, res) => {
        return res.render("info/contactanos", {
            title: "Next Games | Contactanos"
        })
    },
    consulta: async (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const {
                name,
                emails,
                tel,
                province,
                municipio,
                localidad,
                asunto,
                description }
                = req.body

            try {

                db.Consultation.create({
                    name: name.trim(),
                    emails: emails.trim(),
                    tel,
                    province,
                    municipio,
                    localidad,
                    asunto: asunto.trim(),
                    description: description.trim()
                }).then(() => {
                    res.redirect('/')
                })
            } catch (error) {
                console.log(error);
            }

        } else {
            return res.render("info/contactanos", {
                title: "Next Games | Contactanos",
                errors: errors.mapped(),
                old: req.body
            })
        }
    }
}