const { readJSON, writeJSON} = require("../data");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
    dashboardProduct: (req,res) => {
        const products = readJSON("productDataBase.json")
        let productsDashboard;
        const {searchprodu} = req.query;

        if(searchprodu){
            productsDashboard = products.filter(product => product.name.toLowerCase().includes(searchprodu.toLowerCase()) || product.subCategory.toLowerCase().includes(searchprodu.toLowerCase()) || product.category.toLowerCase().includes(searchprodu.toLowerCase()) || product.description.toLowerCase().includes(searchprodu.toLowerCase()))
        }else{
            productsDashboard = products
        }


        return res.render("admin/dashboardProduct",{
            title : "Next Games | dashboard Productos",
            products: productsDashboard,searchprodu,
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