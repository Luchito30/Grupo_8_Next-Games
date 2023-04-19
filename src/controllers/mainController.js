const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  home: (req, res) => {
      const inSale = db.Product.findAll({
        where: {
          discount: { [Op.gt]: 0 },
        },
        include: ["state", "images"],
      });

      const computacion = db.Product.findAll({
        where:{
          subcategoryId: 5
        },
          include: ["images", "state"],
      });

      const ingresos =  db.Product.findAll({
        order: [["createdAt", "DESC"]],
        include: ["images", "state"],
      });

      const tarjetas =  db.Product.findAll({
        where:{
          subcategoryId: 3
        },
          include: ["images", "state"],
      });

      const consolas =  db.Product.findAll({
        where:{
          subcategoryId: 4
        },
          include: ["images", "state"],
      });

      const juegos =  db.Product.findAll({
        where:{
          subcategoryId: 1
        },
          include: ["images", "state"],
      });

      Promise.all([inSale,computacion,ingresos,tarjetas,consolas,juegos])
      .then(([inSale,computacion,ingresos,tarjetas,consolas,juegos]) =>{
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
      
      }).catch(error => console.log(error))
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
