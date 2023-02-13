const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports  = {
    home: (req,res) =>{
    const inSale = products.filter(product => product.category === "in-sale" )
     return res.render('home',{
        inSale,
        toThousand
     })   
    }
}