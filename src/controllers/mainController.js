const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  home: async (req, res) => {
    const ID_JUEGOS = 1;
    const ID_CARDS = 3;
    const ID_CONSOLAS = 4;
    const ID_NOTEBOOK = 5;

    try {
      const inSale = await db.Product.findAll({
        where: {
          discount: { [Op.gt]: 0 },
        },
        include: ["state", "images"],
      });

      const computacion = await db.Subcategory.findByPk(ID_NOTEBOOK, {
        include: [
          {
            association: "products",
            include: ["images", "state"],
          },
        ],
      });

      const ingresos = await db.Product.findAll({
        order: [["createdAt", "DESC"]],
        include: ["images", "state"],
      });

      const tarjetas = await db.Subcategory.findByPk(ID_CARDS, {
        include: [{ association: "products", include: ["images", "state"] }],
      });

      const consolas = await db.Subcategory.findByPk(ID_CONSOLAS, {
        include: [{ association: "products", include: ["images", "state"] }],
      });

      const juegos = await db.Subcategory.findByPk(ID_JUEGOS, {
        include: [{ association: "products", include: ["images", "state"] }],
      });

      return res.render("home", {
        title: "Next Games | Home",
        inSale,
        computacion: computacion?.products,
        ingresos,
        tarjetas: tarjetas?.products,
        consolas: consolas?.products,
        juegos: juegos?.products,
        toThousand,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  newslletter: (req, res) => {

    const { email } = req.body;

    db.NewsLatter.create({
      email: email
    }).then((newslatter => {
      return res.redirect("/");
    })
    ).catch(error => console.log(error))
  },
  search: (req, res) => {
    const { keywords } = req.query;
    db.Product.findAll({
      where: {
        [Op.or]:[{
          name: {
          [Op.like] : `%${keywords}%`
        }},
        {
        description:{
          [Op.like] : `%${keywords}%`
        }}
        ]
        
      },
      include:['images','state','subcategories']
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
};
