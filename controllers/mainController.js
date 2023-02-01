const controller = {
    home: (req, res) => {
        return res.render('home');
    },
    register: (req, res) => {
        return res.render('register');
    },
    login: (req, res) => {
        return res.render('login');
    },
    carrito: (req, res) => {
        return res.render('carrito');
    },
    detalleproducto: (req, res) => {
        return res.render('detalle-producto');
    }
}

module.exports =controller