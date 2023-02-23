const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productDataBase.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports  = {
    home: (req,res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const inSale = products.filter(product => product.category === "in-sale" )
    const computacion = products.filter(product => product.subCategory === "Notebooks" )
    const ingresos = products.filter(product => product.category === "newer" )
    const tarjetas = products.filter(product => product.subCategory === "Gifts Cards" )
    const consolas = products.filter(product => product.subCategory === "Consolas" )
    const juegos = products.filter(product => product.subCategory === "Juegos" )
     return res.render('home',{
        title: " Next Games | Home",
        inSale,
        computacion,
        ingresos,
        tarjetas,
        consolas,
        juegos,
        toThousand
     })   
    }
}
