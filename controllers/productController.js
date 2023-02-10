module.exports = {

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
            ...product
        });
    },
    /* Update - Method to update */
    update: (req, res) => {
        const { id } = req.params
        const product = products.find(product => product.id === +id);

        const { name, discount, price, description, category } = req.body;

        const productModified = {
            id: +id,
            name: name.trim(),
            description: description.trim(),
            price: +price,
            discount: +discount,
            image: product.image,
            category
        }

        const productsModified = products.map(product => {
            if (product.id === +id) {
                return productModified
            }

            return product;
        })

        fs.writeFileSync(productsFilePath, JSON.stringify(productsModified, null, 3), "utf-8");

        return res.redirect("/products/detalle-producto/" + id)
    },

    crearItem: (req, res) => {
        return res.render('products/crear-item');
    }
}

