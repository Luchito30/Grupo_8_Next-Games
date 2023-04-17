const db = require("../database/models");
const { Op, Association } = require("sequelize");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
    dashboardProduct: (req,res) => {

        db.Product.findAll({ include: [{association:"subcategories"},"images", "state"] })
      .then((products) => {
        return res.render("admin/dashboardProduct",{
            title : "Next Games | dashboard Productos",
            products,
            toThousand
        });
      })
      .catch((error) => console.log(error));
     },
     dashboardUser: (req,res) => {
        db.User.findAll()
      .then((user) => {
        return res.render("admin/dashboardUser",{
            title : "Next Games | dashboard Productos",
            user,
        });
      })
      .catch((error) => console.log(error));
}
}