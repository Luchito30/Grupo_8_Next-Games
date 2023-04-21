const fs = require("fs");
const { validationResult } = require("express-validator");
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

        if (!product) {
          return res.redirect("/")
        }
        return res.render("productos/detalle-producto", {
          title: "Next Games | Detalle de producto",
          ...product.dataValues,
          toThousand,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getFromSubcategory:(req, res) => {
    const { subcategoryId } = req.params;
   
    db.Product.findAll({
      where: {
        subcategoryId : subcategoryId
      },
      include: [{
        association: 'subcategories'
      }, 'images', 'state']
    })
      .then((products) => {
        const subName = products[0].subcategories.name; 
        return res.render("products", {
          title: "Next Games | Productos",
          products,
          toThousand,
          subName : subName.toUpperCase()
        });
      })
      .catch((error) => console.log(error));
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
          stateName: stateName
        });
      })
      .catch((error) => console.log(error));
  },
  edicion: (req, res) => {
    const { id } = req.params;

    const product = db.Product.findByPk(id, {
      include: ["images"],
    });

    const categories = db.Subcategory.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });

    const states = db.State.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });


    Promise.all([product, states, categories])
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
      const { id } = req.params;
      const { name, discount, price, description, category, subCategory,image} =
        req.body;

          db.Product.update(
          {
            name: name.trim(),
            description: description.trim(),
            price,
            discount,
            subcategoryId: subCategory,
            stateId: category,
            image:req.files && req.files.image ? req.files.image[0].filename : image
          },{
          where:{
          id: id
          }},
        ).then(() => {
          return res.redirect("/admin/dashboardProduct");
        }).catch((error) => console.log(error))
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

      const categories = db.Subcategory.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });

      
      const product =  db.Product.findByPk(id, {
        include: ["images",],
      });

      Promise.all([product, states, categories]).then(([product, states, categories]) => {
        return res.render("productos/edicion", {
          title: "Next Games | Editar Producto",
          ...product.dataValues,
          states,
          categories,
          toThousand,
          errors: errors.mapped(),
          old: req.body,
        });
      });
    }
  },
  createItem: (req, res) => {

    const product = db.Product.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });

    const categories = db.Subcategory.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });


    const states = db.State.findAll({
      order: [["name"]],
      attributes: ["name", "id"],
    });


    Promise.all([product, states, categories])
      .then(([product, states, categories]) =>  {
        return res.render('productos/crear-item', {
          title: "Next Games | Crear Producto",
          product,
          states,
          categories,
          toThousand,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
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
        category,
        subCategory
      } = req.body;

      db.Product.create({
        name: name.trim(),
        price,
        discount,
        description: description.trim(),
        stateId: category,
        subcategoryId: subCategory,
        image:req.files && req.files.image ? req.files.image[0].filename : product.image,
      }).then((product) => {
        return res.redirect("/admin/dashboardProduct");
      }).catch((error) => console.log(error))
    } else {
     
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

      const product = db.Product.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });
  
      const categories = db.Subcategory.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });
  
  
      const states = db.State.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });
  
  
      Promise.all([product, states, categories])
        .then(([product, states, categories]) =>  {
          return res.render('productos/crear-item', {
            title: "Next Games | Crear Producto",
            product,
            states,
            categories,
            toThousand,
            errors: errors.mapped(),
            old: req.body
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  removeConfirm: (req, res) => {
    const {id} = req.params;
    
    db.Product.findByPk(id).then(product => {
      return res.render("productos/confirmRemove", {
        ...product.dataValues,
        title: "Next Games | Advertencia",
      });
    })
  },
  remove: (req, res) => {
    const {id} = req.params
  
   const product = db.Product.findByPk(id,{
    include : {all:true}
   })
   
    db.Product.destroy({
      where: {
        id
      },
    }).then(() => {
        return res.redirect("/admin/dashboardProduct");
      })
      .catch((error) => console.log(error));
  }
};
