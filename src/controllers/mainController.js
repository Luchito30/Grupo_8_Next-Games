const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');

module.exports = {
  home: (req, res) => {

    const ID_compu = 5;
    const ID_ingresos = 2;
    const ID_tarjeta = 3;
    const ID_consolas = 4;
    const ID_juegos = 1;

    const inSale = db.Product.findAll({
      where: {
        discount: { [Op.gt]: 0 },
      },
      include: ["state", "images"],
      limit: 10,
    });

    const computacion = db.Product.findAll({
      where: {
        subcategoryId: ID_compu
      },
      include: ["images", "state"],
    });

    const ingresos = db.Product.findAll({
      where: {
        stateId: ID_ingresos
      },
      include: [{
        association: 'state'
      }, 'images', 'subcategories']
    })

    const tarjetas = db.Product.findAll({
      where: {
        subcategoryId: ID_tarjeta
      },
      include: ["images", "state"],
    });

    const consolas = db.Product.findAll({
      where: {
        subcategoryId: ID_consolas
      },
      include: ["images", "state"],
    });

    const juegos = db.Product.findAll({
      where: {
        subcategoryId: ID_juegos
      },
      include: ["images", "state"],
    });

    Promise.all([inSale, computacion, ingresos, tarjetas, consolas, juegos])
      .then(([inSale, computacion, ingresos, tarjetas, consolas, juegos]) => {
        return res.render("home", {
          title: "Next Games | Home",
          inSale,
          computacion,
          tarjetas,
          consolas,
          juegos,
          ingresos,
          toThousand,
        })
      })
      .catch(error => console.log(error));
  },
  search: (req, res) => {
    const { keywords } = req.query;
    db.Product.findAll({
      where: {
        [Op.or]: [{
          name: {
            [Op.like]: `%${keywords}%`
          }
        },
        {
          description: {
            [Op.like]: `%${keywords}%`
          }
        }
        ]

      },
      include: ['images', 'state', 'subcategories']
    })
      .then(product => {
        return res.render("results", {
          title: "Next Games | Search",
          product,
          toThousand,
          keywords
        });
      }).catch(error => console.log(error))
  },
  NewsLatter: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { email } = req.body;

      if (email) {
        db.NewsLatter.create({
          email: email
        }).then(() => {
          return res.redirect('/')
        }).catch(error => console.log(error));
      }
    } else {
      return res.redirect('/')

    }

  }
}