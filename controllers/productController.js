const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
module.exports = {
    index: (req, res) => {
		return res.render('products',{
			products,
			toThousand
		})
	},
  
    carrito: (req, res) => {
        return res.render('productos/carrito');
    },
    detalleproducto: (req, res) => {
        return res.render('productos/detalle-producto');
    },
    edicion: (req, res) => {
        return res.render('productos/edicion');
    },
    crearItem: (req, res) => {
        return res.render('productos/crear-item');
},
  store: (req,res)=>{
    
   
    const{name,price,description,discount,image,category}= req.body;
    const newProduct={
        id:products[products.length -1].id +1,
        name:name.trim(),
        description: description.trim(),
        price:+price,
        discount:+discount,
        image:null,
        category
    };
    products.push(newProduct);
    fs.writeFileSync('./data/productDataBase.json', JSON.stringify(products, null,3), 'utf-8')
    return res.redirect('/')
  }
}

