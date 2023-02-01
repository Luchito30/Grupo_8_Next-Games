const controller = {
  
    carrito: (req, res) => {
        return res.render('products/carrito');
    },
    detalleproducto: (req, res) => {
        return res.render('products/detalle-producto');
    }
}

module.exports =controller