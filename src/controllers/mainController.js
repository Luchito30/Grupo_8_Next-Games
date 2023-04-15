const fs = require('fs');
const path = require('path');
const { readJSON, writeJSON } = require("../data");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
    home: (req, res) => {

        const inSale = db.Product.findAll({
            where:{
                [Op.ne]:0
            }
        });

        const computacion = db.Product.findAll({
            include: [
                {
                    association: "SubCategory",
                    attibutes: ["name"]
                }
            ],
            where: {
                CategoryId: {
                    [Op.eq]: 5
                }
            }
        });

        const ingresos = db.Product.findAll({
            order: [["createdAt", "DESC"]],
            include : ['images']
        });

        const tarjetas = db.Product.findAll({
            include: [
                {
                    association: "SubCategory",
                    attibutes: ["name"]
                }
            ],
            where: {
                CategoryId: {
                    [Op.eq]: 3
                }
            }
        });

        const consolas = db.Product.findAll({
            include: [
                {
                    association: "SubCategory",
                    attibutes: ["name"]
                }
            ],
            where: {
                CategoryId: {
                    [Op.eq]: 4
                }
            }
        });

        const juegos = db.Product.findAll({
            include: [
                {
                    association: "SubCategory",
                    association: "SubCategory",
                    attibutes: ["name"]
                }
            ],
            where: {
                CategoryId: {
                    [Op.eq]: 1
                }
            }
        });

        Promise.all([inSale,computacion,ingresos,tarjetas,consolas,juegos])
        .then(([inSale,computacion,ingresos,tarjetas,consolas,juegos]) => {
            return res.render('home',{
                title: " Next Games | Home",
                inSale,
                computacion,
                ingresos,
                tarjetas,
                consolas,
                juegos
            });
           }).catch(error => console.log(error)) 
        /* const products = readJSON("productDataBase.json");
        const inSale = products.filter(product => product.category === "in-sale" );
        const computacion = products.filter(product => product.subCategory === "Notebooks" );
        const ingresos = products.filter(product => product.category === "newer" );
        const tarjetas = products.filter(product => product.subCategory === "Gifts Cards" );
        const consolas = products.filter(product => product.subCategory === "Consolas" );
        const juegos = products.filter(product => product.subCategory === "Juegos" );
         return res.render('home',{
            title: " Next Games | Home",
            inSale,
            computacion,
            ingresos,
            tarjetas,
            consolas,
            juegos,
            toThousand
         }) */
    },
    newslletter: (req, res) => {
        const noticias = readJSON("newsletter.json")
        const { email } = req.body;

        const newNoticia = {
            id: +noticias[noticias.length - 1].id + 1,
            email: email
        };
        noticias.push(newNoticia);
        writeJSON("newsletter.json", noticias)
        return res.redirect('/')

    },
    search: (req, res) => {
        const products = readJSON("productDataBase.json")
        const { keywords } = req.query;
        const productFiltered = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()) || product.subCategory.toLowerCase().includes(keywords.toLowerCase()) || product.description.toLowerCase().includes(keywords.toLowerCase()))
        return res.render('results', {
            title: "Next Games | Search",
            productFiltered,
            toThousand,
            keywords,
        })
    }
}
