const fs = require('fs');
const { validationResult } = require('express-validator');
const { readJSON, writeJSON } = require('../data');
const products = readJSON("productDataBase.json");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {

  index: (req, res) => {
    const products = readJSON("productDataBase.json");
    let allproducts;
    const {searchallprodu} = req.query

      if(searchallprodu){
        allproducts = products.filter(product => product.name.toLowerCase().includes(searchallprodu.toLowerCase()) || product.subCategory.toLowerCase().includes(searchallprodu.toLowerCase()) || product.category.toLowerCase().includes(searchallprodu.toLowerCase()) || product.description.toLowerCase().includes(searchallprodu.toLowerCase()))
      }else{
        allproducts = products
      }


    return res.render('products', {
      title: "Next Games | Productos",
      products: allproducts,searchallprodu ,
      toThousand
    })
  },
  carrito: (req, res) => {
    return res.render('productos/carrito', {
      title: "Next Games | Carrito"
    });
  },
  detalleproducto: (req, res) => {
    const products = readJSON("productDataBase.json");
    let product = products.find(product => product.id === +req.params.id);
    return res.render('productos/detalle-producto', {
      title: "Next Games | Detalle de producto",
      ...product,
      toThousand
    });
  },
  edicion: (req, res) => {
    const products = readJSON("productDataBase.json");
    const { id } = req.params;
    const product = products.find(product => product.id === +id);
    return res.render('productos/edicion', {
      title: "Next Games | Editar Producto",
      ...product,
      toThousand
    });
  },
  update: (req, res) => {

    const errors = validationResult(req);

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "images",
        location: "files"
      })
    }

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "image",
        location: "files"
      })
    }


    if (errors.isEmpty()) {

      const products = readJSON("productDataBase.json");
      const id = +req.params.id
      const { name, discount, price, description, category, subCategory } = req.body;

      const productsModified = products.map(product => {
        if (product.id === +id) {

          const productUpdated = {
            id,
            name: name.trim(),
            description: description.trim(),
            price: +price,
            discount: +discount,
            subCategory,
            category,
            image: req.files && req.files.image ? req.files.image[0].filename : product.image,
            images: req.files && req.files.images ? req.files.images.map(file => file.filename) : product.images,
          };

          return productUpdated
        }

        return product;
      })


      writeJSON("productDataBase.json", productsModified)
      return res.redirect("/admin/dashboardProduct")

    }else{
      

      if (req.files.image) {
        req.files.image.forEach(file => {
          fs.existsSync(`./public/images/products/${file.filename}`) && fs.unlinkSync(`./public/images/products/${file.filename}`);
        });
      }

      if (req.files.images) {
        req.files.images.forEach(file => {
          fs.existsSync(`./public/images/products/${file.filename}`) && fs.unlinkSync(`./public/images/products/${file.filename}`);
        });
      }


      const products = readJSON("productDataBase.json");
      const { id } = req.params;
      const product = products.find(product => product.id === +id);
      return res.render('productos/edicion', {
        title: "Next Games | Editar Producto",
        ...product,
        toThousand,
        errors : errors.mapped(),
        old : req.body
      });
    }

  },
  createItem: (req, res) => {
    return res.render('productos/crear-item', {
      title: "Next Games | Crear Producto"
    });
  },
  storeMainImage: (req, res) => {

    const errors = validationResult(req);

    if (!req.files.images && !req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: "El producto debe tener por lo menos una imagen",
        param: "images",
        location: "files"
      })
    }

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "images",
        location: "files"
      })
    }

    if (!req.files.image && !req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: "El producto debe tener una imagen",
        param: "image",
        location: "files"
      })
    }

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "image",
        location: "files"
      })
    }

    if (errors.isEmpty()) {

      const products = readJSON("productDataBase.json")
      const { name, price, description, discount, image, images, category, subCategory } = req.body;

      const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name: name.trim(),
        description: description.trim(),
        price: +price,
        discount: +discount,
        subCategory,
        category,
        image: req.files && req.files.image ? req.files.image[0].filename : "default-image.png",
        images: req.files && req.files.images ? req.files.images.map(file => file.filename) : [],
      };


      products.push(newProduct);

      writeJSON("productDataBase.json", products);

      return res.redirect(`detalle-producto/${newProduct.id}`);

    } else {

      if (req.files.image) {
        req.files.image.forEach(file => {
          fs.existsSync(`./public/images/products/${file.filename}`) && fs.unlinkSync(`./public/images/products/${file.filename}`);
          errors.errors.push({
            value: "",
            msg: "Debe seleccionar de nuevo la imagen",
            param: "image",
            location: "files"
          })
        });
      }

      if (req.files.images) {
        req.files.images.forEach(file => {
          fs.existsSync(`./public/images/products/${file.filename}`) && fs.unlinkSync(`./public/images/products/${file.filename}`);
          errors.errors.push({
            value: "",
            msg: "Debe seleccionar de nuevo las imagenes",
            param: "images",
            location: "files"
          })
        });
      }

      return res.render('productos/crear-item', {
        title: "Next Games | Crear Producto",
        errors: errors.mapped(),
        old: req.body
      })
    }

  },

  removeConfirm: (req, res) => {
    const products = readJSON("productDataBase.json");
    const id = req.params.id;
    const product = products.find(product => product.id === +id);

    return res.render('productos/confirmRemove', {
      ...product,
      title: "Next Games | Advertencia"
    })
  },
  remove: (req, res) => {
    const products = readJSON("productDataBase.json");
    const id = req.params.id;
    const productsModified = products.filter(product => product.id !== +id);


    writeJSON("productDataBase.json", productsModified)
    return res.redirect("/admin/dashboardProduct")
  },
  notebook: (req, res) => {
    const products = readJSON("productDataBase.json");
    const computacion = products.filter(product => product.subCategory === "Notebooks")
    return res.render('productos/compu', {
      title: "Next Games | Notebook",
      computacion,
      toThousand
    })
  },
  accesorios: (req, res) => {
    const products = readJSON("productDataBase.json");
    const Accesorios = products.filter(product => product.subCategory === "Accesorios")
    return res.render('productos/accesorios', {
      title: "Next Games | Accesorios",
      Accesorios,
      toThousand
    })
  },
  consolas: (req, res) => {
    const products = readJSON("productDataBase.json");
    const consolas = products.filter(product => product.subCategory === "Consolas")
    return res.render('productos/consolas', {
      title: "Next Games | Consolas",
      consolas,
      toThousand
    })
  },
  tarjetas: (req, res) => {
    const products = readJSON("productDataBase.json");
    const tarjetas = products.filter(product => product.subCategory === "Gifts Cards")
    return res.render('productos/tarjetas', {
      title: "Next Game | Gifts Cards",
      tarjetas,
      toThousand
    })
  },
  juegos: (req, res) => {
    const products = readJSON("productDataBase.json");
    const juegos = products.filter(product => product.subCategory === "Juegos")
    return res.render('productos/juegos', {
      title: "Next Games | Juegos",
      juegos,
      toThousand
    })
  },
  perifericos: (req, res) => {
    const products = readJSON("productDataBase.json");
    const perifericos = products.filter(product => product.subCategory === "Perifericos")
    return res.render('productos/perifericos', {
      title: "Next Games | Perifericos",
      perifericos,
      toThousand
    })
  },
  ofertas: (req, res) => {
    const products = readJSON("productDataBase.json");
    const inSale = products.filter(product => product.category === "in-sale")
    return res.render('productos/insale', {
      title: "Next Games | Ofertas",
      inSale,
      toThousand
    })
  },
  ingresos: (req, res) => {
    const products = readJSON("productDataBase.json");
    const ingresos = products.filter(product => product.category === "newer")
    return res.render('productos/ingresos', {
      title: "Next Games | Ingresos",
      ingresos,
      toThousand
    })
  }
}