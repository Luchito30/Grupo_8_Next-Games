const db = require("../database/models");
const { Op } = require("sequelize");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
  dashboardProduct: (req, res) => {
    let productsDashboard;
    const { searchprodu } = req.query;

    if (searchprodu) {
      productsDashboard = db.Product.findAll({
        where: {
          [Op.or]: [{
            name: {
              [Op.like]: `%${searchprodu}%`
            }
          },
          {
            description: {
              [Op.like]: `%${searchprodu}%`
            }
          }
          ]

        },
        include: ['images', 'state', 'subcategories']
      }).then((products) => {
        return res.render("admin/dashboardProduct", {
          title: "Next Games | dashboard Productos",
          products,
          toThousand
        });
      })
        .catch((error) => console.log(error));

    } else {
      productsDashboard = db.Product.findAll({ include: [{ association: "subcategories" }, "images", "state"] })
        .then((products) => {
          return res.render("admin/dashboardProduct", {
            title: "Next Games | dashboard Productos",
            products,
            toThousand
          });
        })
        .catch((error) => console.log(error));
    }

  },
  dashboardUser: (req, res) => {

    let userDashboard;
    const { searchuser } = req.query;

    if (searchuser) {
      userDashboard = db.User.findAll({
        where: {
          [Op.or]: [{
            firstName: {
              [Op.like]: `%${searchuser}%`
            }
          },
          {
            LastName: {
              [Op.like]: `%${searchuser}%`
            }
          },
          {
            email: {
              [Op.like]: `%${searchuser}%`
            }
          },
          {
            userName: {
              [Op.like]: `%${searchuser}%`
            }
          }
          ]

        },
        include: ["rol"]
      }).then((user) => {
        return res.render("admin/dashboardUser", {
          title: "Next Games | dashboard Productos",
          user,
        });
      })
        .catch((error) => console.log(error));

    } else {
      userDashboard = db.User.findAll()
        .then((user) => {
          console.log(user)
          return res.render("admin/dashboardUser", {
            title: "Next Games | dashboard Productos",
            user,
          });
        })
        .catch((error) => console.log(error));

    }
  }
}