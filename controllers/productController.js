const fs = require('fs');
const path = require('path');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
module.exports = {
  
    carrito: (req, res) => {
        return res.render('products/carrito');
    },
    detalleproducto: (req, res) => {
        return res.render('products/detalle-producto');
    },
    edicion: (req, res) => {
        return res.render('products/edicion');
    },
    crearItem: (req, res) => {
        return res.render('products/crear-item');
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
   
    return res.redirect('home')
  }
}

