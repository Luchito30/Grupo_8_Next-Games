const { readJSON, writeJSON } = require("../data");
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
    /* const products = readJSON("productDataBase.json");
        const inSale = products.filter(product => product.category === "in-sale" );
        const computacion = products.filter(product => product.subcategory === "Notebooks" );
        const ingresos = products.filter(product => product.category === "newer" );
        const tarjetas = products.filter(product => product.subcategory === "Gifts Cards" );
        const consolas = products.filter(product => product.subcategory === "Consolas" );
        const juegos = products.filter(product => product.subcategory === "Juegos" );
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

    const { email } = req.body;

    db.NewsLatter.create({
      email: email
    }).then((newslatter => {
      return res.redirect("/");
    })
    ).catch(error => console.log)
    /* const noticias = readJSON("newsletter.json");
    const { email } = req.body;

    const newNoticia = {
      id: +noticias[noticias.length - 1].id + 1,
      email: email,
    };
    noticias.push(newNoticia);
    writeJSON("newsletter.json", noticias);
    return res.redirect("/"); */
  },
  search: (req, res) => {
    const products = readJSON("productDataBase.json");
    const { keywords } = req.query;
    const productFiltered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(keywords.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(keywords.toLowerCase()) ||
        product.description.toLowerCase().includes(keywords.toLowerCase())
    );
    return res.render("results", {
      title: "Next Games | Search",
      productFiltered,
      toThousand,
      keywords,
    });
  },
};
