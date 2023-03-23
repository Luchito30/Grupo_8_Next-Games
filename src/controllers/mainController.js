const fs = require('fs');
const path = require('path');
const { readJSON} = require("../data");

const productsFilePath = path.join(__dirname, '../data/productDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports  = {
    home: (req,res) =>{
        const products = readJSON("productDataBase.json")
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
    },
    newslletter: (req,res) =>{
        const newslletteremail = path.join(__dirname, '../data/newsletter.json');
        const noticias = JSON.parse(fs.readFileSync(newslletteremail, 'utf-8'));
        const{email}= req.body;

        const newNoticia={
            id:+noticias[noticias.length -1].id +1,
            email: email
        };
          noticias.push(newNoticia);
          fs.writeFileSync('./data/newsletter.json', JSON.stringify(noticias, null,3), 'utf-8')
          return res.redirect('/')

    },
     search: (req, res) => {
        const products = readJSON("productDataBase.json")
        const {keywords} = req.query;
        const productFiltered = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()) || product.subCategory.toLowerCase().includes(keywords.toLowerCase()) || product.description.toLowerCase().includes(keywords.toLowerCase()))
        return res.render('results', {
            title: "Next Games | Search",
			productFiltered,
			toThousand,
			keywords,
		})
    },
     admin: (req,res) => {
        const products = readJSON("productDataBase.json")
        return res.render("dashboardProduct",{
            title : "Next Games | dashboard Productos",
            products,
            toThousand
        })
     }

    
}
