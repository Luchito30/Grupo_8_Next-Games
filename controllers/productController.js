const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req, res) => {
        return res.render('products', {
            products,
            toThousand
        })
    },

    carrito: (req, res) => {
        return res.render('products/carrito');
    },
    detalleproducto: (req, res) => {
        return res.render('products/detalle-producto');
    },
    /* Update - Form to edit */
    edicion: (req, res) => {
        const { id } = req.params;
        const product = products.find(product => product.id === +id);
        return res.render('products/edicion', {
            ...product,
            toThousand
        });
    },
    /* Update - Method to update */
    update: (req, res) => {

        const { id } = req.params
        const product = products.find(product => product.id === +id);

        const { name, discount, price, description, category, image, selection } = req.body;

        const productModified = {
            id: +id,
            name: name.trim(),
            description: description.trim(),
            price: +price,
            discount: +discount,
            image: null,
            category,
            selection
        };

        const productsModified = products.map(product => {
            if (product.id === +id) {
                return productModified
            }

            return product;
        })
        product.push(productModified);
        fs.writeFileSync('./data/productDataBase.json', JSON.stringify(products, null, 3), "utf-8");

        return res.redirect("/products" + id)
    },

    crearItem: (req, res) => {
        return res.render('products/crear-item');
    }
}

