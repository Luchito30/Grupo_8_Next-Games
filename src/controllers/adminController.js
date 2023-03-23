const { readJSON, writeJSON} = require("../data");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
    dashboardProduct: (req,res) => {
        const products = readJSON("productDataBase.json")
        return res.render("admin/dashboardProduct",{
            title : "Next Games | dashboard Productos",
            products,
            toThousand
        })
     },
     dashboardUser: (req,res) => {
        const users = readJSON("user.json")
        return res.render("admin/dashboardUser",{
            title : "Next Games | dashboard Usuarios",
            users,
        })
     }
}