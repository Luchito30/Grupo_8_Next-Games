const fs = require("fs");
const { validationResult } = require("express-validator");
const { readJSON } = require("../data");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require("../database/models");

module.exports = {
  index: (req, res) => {
    db.Product.findAll({ include: ["images", "state", "subcategories"] })
      .then((products) => {
        return res.render("products", {
          title: "Next Games | Productos",
          products,
          toThousand
        });
      })
      .catch((error) => console.log(error));
    /*  const products = readJSON("productDataBase.json");
       let allproducts;
   
         if(searchallprodu){
           allproducts = products.filter(product => product.name.toLowerCase().includes(searchallprodu.toLowerCase()) || product.subCategory.toLowerCase().includes(searchallprodu.toLowerCase()) || product.category.toLowerCase().includes(searchallprodu.toLowerCase()) || product.description.toLowerCase().includes(searchallprodu.toLowerCase()))
         }else{
           allproducts = products
         } */
  },
  carrito: (req, res) => {
    return res.render("productos/carrito", {
      title: "Next Games | Carrito",
    });
  },
  detalleproducto: (req, res) => {
    const { id } = req.params;

    db.Product.findByPk(id, {
      include: [
        {
          association: "images",
          attributes: ["image"],
        },
        {
          association: "state",
          attributes: ["name"],
        },
        {
          association: "subcategories",
          attributes: ["name"],
        },
      ],
    })
      .then((product) => {
        console.log(product)
        return res.render("productos/detalle-producto", {
          title: "Next Games | Detalle de producto",
          ...product.dataValues,
          toThousand,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    /*  const products = readJSON("productDataBase.json");
    let product = products.find(product => product.id === +req.params.id);
    return res.render('productos/detalle-producto', {
      title: "Next Games | Detalle de producto",
      ...product,
      toThousand
    }); */
  },
  getFromSubcategory:(req, res) => {
    const { subcategoryId } = req.params;
    const searchallprodu = false
    db.Subcategory.findByPk(subcategoryId,{
      include:[
        {
          association:'products',
          include:['images','state']
        }
      ]
    })
      .then((subcategory) => {
        console.log(subcategory);
        return res.render("products", {
          title: "Next Games | Productos",
          products:subcategory.products,
          toThousand,
          searchallprodu,
          titleView: subcategory.name
        });
      })
      .catch((error) => console.log(error));

  },
  edicion: (req, res) => {
    const { id } = req.params;

    const product = db.Product.findByPk(id, {
      include: ["images"],
    });

    const states = db.State.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });

    const categories =  db.Subcategory.findAll({
      include: [
        {
          association: "products",
          include: ["images", "state"],
        },
      ],
    });

    Promise.all([product, states,categories])
      .then(([product, states,categories]) => {
        return res.render("productos/edicion", {
          title: "Next Games | Editar Producto",
          ...product.dataValues,
          states,
          categories,
          toThousand,
        });
      })
      .catch((error) => console.log(error));

  },
  update: async (req, res) => {
    const errors = validationResult(req);

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "images",
        location: "files",
      });
    }

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "image",
        location: "files",
      });
    }

    if (errors.isEmpty()) {
      const { id } = +req.params;
      const { name, discount, price, description, category, subCategory } =
        req.body;

      db.Product.findByPk(id).then((product) => {
        const productEdit = db.Product.update(
          {
            name: name.trim(),
            description: description.trim(),
            price,
            discount,
            subcategoryId: subCategory,
            stateId: category,
            image:
              req.files && req.files.image
                ? req.files.image[0].filename
                : product.image,
            images:
              req.files && req.files.images
                ? req.files.images.map((file) => file.filename)
                : product.images,
          },
          {
            where: {
              id,
            },
          }
        );
        Promise.all([productEdit]).then(() => {
          return res.redirect("/admin/dashboardProduct",{
            productEdit
          });
        });
      });
    } else {
      const { id } = req.params;

      if (req.files.image) {
        req.files.image.forEach((file) => {
          fs.existsSync(`./public/images/products/${file.filename}`) &&
            fs.unlinkSync(`./public/images/products/${file.filename}`);
        });
      }

      if (req.files.images) {
        req.files.images.forEach((file) => {
          fs.existsSync(`./public/images/products/${file.filename}`) &&
            fs.unlinkSync(`./public/images/products/${file.filename}`);
        });
      }

      const states =  db.State.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });
      
      const product =  db.Product.findByPk(id, {
        include: ["images",],
      });

      Promise.all([product, states]).then(([product, states]) => {
        return res.render("productos/edicion", {
          title: "Next Games | Editar Producto",
          ...product.dataValues,
          states,
          toThousand,
          errors: errors.mapped(),
          old: req.body,
        });
      });
    }
  },
  createItem: (req, res) => {
    const products = db.Product.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });

    const categories = db.Subcategory.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });

    Promise.all([products, categories])
      .then(([products, categories]) => {
        return res.render("productos/edicion", {
          title: "Next Games | Editar Producto",
          products,
          categories,
          toThousand,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  /*  return res.render('productos/crear-item', {
      title: "Next Games | Crear Producto"
    });
  }, */
  storeMainImage: (req, res) => {
    const errors = validationResult(req);

    if (!req.files.images && !req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: "El producto debe tener por lo menos una imagen",
        param: "images",
        location: "files",
      });
    }

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "images",
        location: "files",
      });
    }

    if (!req.files.image && !req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: "El producto debe tener una imagen",
        param: "image",
        location: "files",
      });
    }

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "image",
        location: "files",
      });
    }

    if (errors.isEmpty()) {
      const {
        name,
        price,
        description,
        discount,
        image,
        images,
        category,
        subCategory,
      } = req.body;

      db.Product.create({
        name: name.trim(),
        description: description.trim(),
        price: +price,
        discount: +discount,
        subCategory,
        category,
      }).then((product) => {
        req.files.forEach((image, index) => {
          db.Image.create({
            name: image.filename,
            productId: product.id,
          });
        });
        return res.redirect(`/products/detalle-producto/${newProduct.id}`);
      });
      /* const products = readJSON("productDataBase.json")
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
 */
    } else {
      const products = db.Product.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });

      const categories = db.Subcategory.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });

      if (req.files.image) {
        req.files.image.forEach((file) => {
          fs.existsSync(`./public/images/products/${file.filename}`) &&
            fs.unlinkSync(`./public/images/products/${file.filename}`);
          errors.errors.push({
            value: "",
            msg: "Debe seleccionar de nuevo la imagen",
            param: "image",
            location: "files",
          });
        });
      }

      if (req.files.images) {
        req.files.images.forEach((file) => {
          fs.existsSync(`./public/images/products/${file.filename}`) &&
            fs.unlinkSync(`./public/images/products/${file.filename}`);
          errors.errors.push({
            value: "",
            msg: "Debe seleccionar de nuevo las imagenes",
            param: "images",
            location: "files",
          });
        });
      }

      Promise.all([product, categories]).then(([product, categories]) => {
        return res.render("productos/crear-item", {
          title: "Next Games | Crear Producto",
          errors: errors.mapped(),
          product,
          categories,
          old: req.body,
        });
      });
      /* return res.render('productos/crear-item', {
        title: "Next Games | Crear Producto",
        errors: errors.mapped(),
        old: req.body
      }) */
    }
  },
  removeConfirm: (req, res) => {
    const products = readJSON("productDataBase.json");
    const id = req.params.id;
    const product = products.find((product) => product.id === +id);

    return res.render("productos/confirmRemove", {
      ...product,
      title: "Next Games | Advertencia",
    });
  },
  remove: (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        return res.redirect("/dashboard");
      })
      .catch((error) => console.log(error));

    /* const products = readJSON("productDataBase.json");
    const id = req.params.id;
    const productsModified = products.filter(product => product.id !== +id);


    writeJSON("productDataBase.json", productsModified)
    return res.redirect("/admin/dashboardProduct") */
  },
  getFromCategory:(req, res) => {
    const { stateId } = req.params;
   
    db.Product.findAll({
      where: {
        stateId: stateId
      },
      include: [{
        association: 'state'
      }, 'images', 'subcategories']
    })
    .then((products) => {
      const stateName = products[0].state.name; 
      return res.render("productos/categorias", {
        title: `Next Games | Productos de ${stateName}`, 
        products,
        toThousand,
        stateName
      });
    })
    .catch((error) => console.log(error));
}
};
