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
}
}

