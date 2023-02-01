module.exports = {
  
    carrito: (req, res) => {
        return res.render('products/carrito');
    },
    detalleproducto: (req, res) => {
        return res.render('products/detalle-producto');
    }
}

