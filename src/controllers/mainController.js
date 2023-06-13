const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const mappedFavoritesProducts = require("../helpers/mappedFavoritesProducts");

module.exports = {
  home: async (req, res) => {
    try {
      const ID_compu = 5;
      const ID_ingresos = 2;
      const ID_tarjeta = 3;
      const ID_consolas = 4;
      const ID_juegos = 1;
  
      const [
        inSale,
        computacion,
        ingresos,
        tarjetas,
        consolas,
        juegos
      ] = await Promise.all([
        db.Product.findAll({
          where: {
            discount: { [Op.gt]: 0 },
          },
          include: ["state", "usersFavorites"],
          limit: 10,
        }),
        db.Product.findAll({
          where: {
            subcategoryId: ID_compu,
          },
          include: ["state", "usersFavorites"],
        }),
        db.Product.findAll({
          where: {
            stateId: ID_ingresos,
          },
          include: [
            {
              association: "state",
            },
            "subcategories",
            "usersFavorites",
          ],
        }),
        db.Product.findAll({
          where: {
            subcategoryId: ID_tarjeta,
          },
          include: ["state", "usersFavorites"],
        }),
        db.Product.findAll({
          where: {
            subcategoryId: ID_consolas,
          },
          include: [ "state", "usersFavorites"],
        }),
        db.Product.findAll({
          where: {
            subcategoryId: ID_juegos,
          },
          include: ["state", "usersFavorites"],
        })
      ]);
  
      let mappedInSale = mappedFavoritesProducts({ arrProducts: inSale, req });
      let mappedComputacion = mappedFavoritesProducts({ arrProducts: computacion, req });
      let mappedIngresos = mappedFavoritesProducts({ arrProducts: ingresos, req });
      let mappedTarjetas = mappedFavoritesProducts({ arrProducts: tarjetas, req });
      let mappedConsolas = mappedFavoritesProducts({ arrProducts: consolas, req });
      let mappedJuegos = mappedFavoritesProducts({ arrProducts: juegos, req });
  
      return res.render("home", {
        title: "Next Games | Home",
        inSale: mappedInSale,
        computacion: mappedComputacion,
        tarjetas: mappedTarjetas,
        consolas: mappedConsolas,
        juegos: mappedJuegos,
        ingresos: mappedIngresos,
        toThousand,
      });
    } catch (error) {
      console.log(error);
    }
  },
  
  search: (req, res) => {
    const { keywords } = req.query;
    db.Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${keywords}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${keywords}%`,
            },
          },
        ],
      },
      include: ["images", "state", "subcategories"],
    })
      .then((product) => {
        return res.render("results", {
          title: "Next Games | Search",
          product,
          toThousand,
          keywords,
        });
      })
      .catch((error) => console.log(error));
  },
  NewsLatter: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { email } = req.body;

      if (email) {
        db.NewsLatter.create({
          email: email,
        })
          .then(() => {
            return res.redirect("/");
          })
          .catch((error) => console.log(error));
      }
    } else {
      return res.redirect("/");
    }
  },
};
