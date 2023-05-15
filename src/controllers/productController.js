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

        const subtotal = 6

        if (req.params.subcategoryId > subtotal) {
          return res.redirect("/")
        }

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
        const cattotal = 3

        if (req.params.stateId > cattotal) {
          return res.redirect("/")
        }
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
  
    if (errors.isEmpty()) {
      const { id } = req.params;
      const { name, discount, price, description, category, subCategory, image } = req.body;
  
      try {
        const product = await db.Product.findByPk(id, {
          include: ["images"],
        });
  
        if (product.image) {
          fs.existsSync(`public/images/products/${product.image}`) &&
            fs.unlinkSync(`public/images/products/${product.image}`);
        }

        product.images.forEach((image) => {
          fs.existsSync(`public/images/products/${image.image}`) &&
            fs.unlinkSync(`public/images/products/${image.image}`);
          image.destroy();
        });
  
        await db.Product.update(
          {
            name: name.trim(),
            description: description.trim(),
            price,
            discount,
            subcategoryId: subCategory,
            stateId: category,
            image: req.files && req.files.image ? req.files.image[0].filename : image,
          },
          {
            where: {
              id: id,
            },
          }
        );
  
        if (req.files && req.files.images) {
          req.files.images.forEach(async (file) => {
            await db.Image.create({
              productId: product.id,
              image: file.filename,
            });
          });
        }
  
        return res.redirect("/admin/dashboardProduct");
      } catch (error) {
        console.log(error);
        return res.redirect("/admin/dashboardProduct");
      }
    } else {
      const { id } = req.params;
  
      if (req.files.image) {
        req.files.image.forEach((file) => {
          fs.existsSync(`public/images/products/${file.filename}`) &&
            fs.unlinkSync(`public/images/products/${file.filename}`);
        });
      }
  
      if (req.files.images) {
        req.files.images.forEach((file) => {
          fs.existsSync(`public/images/products/${file.filename}`) &&
            fs.unlinkSync(`public/images/products/${file.filename}`);
        });
      }
  
      const states = await db.State.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });
  
      const categories = await db.Subcategory.findAll({
        order: [["name"]],
        attributes: ["name", "id"],
      });
  
      const product = await db.Product.findByPk(id, {
        include: ["images"],
      });
  
      return res.render("productos/edicion", {
        title: "Next Games | Editar Producto",
        ...product.dataValues,
        states,
        categories,
        toThousand,
        errors: errors.mapped(),
        old: req.body,
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
  storeMainImage: async (req, res) => {
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
      try {
        const {
          name,
          price,
          description,
          discount,
          category,
          subCategory
        } = req.body;
  
        const product = await db.Product.create({
          name: name.trim(),
          price,
          discount,
          description: description.trim(),
          stateId: category,
          subcategoryId: subCategory,
          image: req.files.image[0].filename,
        });
  
        const productImages = req.files.images || [];
        const imagePromises = productImages.map((file) =>
          db.Image.create({
            image: file.filename,
            productId: product.id,
          })
        );
  
        await Promise.all(imagePromises);
  
        return res.redirect(`/products/detalle-producto/${product.id}`);
      } catch (error) {
        console.log(error);
        return res.redirect(`/admin/dashboardProduct`);
      }
    } else {
      try {
        const [product, states, categories] = await Promise.all([
          db.Product.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
          }),
          db.State.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
          }),
          db.Subcategory.findAll({
            order: [["name"]],
            attributes: ["name", "id"],
          }),
        ]);
  
        return res.render("productos/crear-item", {
          title: "Next Games | Crear Producto",
          product,
          states,
          categories,
          toThousand,
          errors: errors.mapped(),
          old: req.body,
        });
      } catch (error) {
        console.log(error);
      }
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
  remove: async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await db.Product.findByPk(id, {
        include: 'images',
      });

      if (product.image) {
        fs.existsSync(`public/images/products/${product.image}`) &&
          fs.unlinkSync(`public/images/products/${product.image}`);
      }
  
      product.images.forEach((image) => {
        const imagePath = `public/images/products/${image.image}`;
  
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
  
      await db.Product.destroy({
        where: {
          id,
        },
      });
  
      return res.redirect("/admin/dashboardProduct");
    } catch (error) {
      console.log(error);
      return res.redirect("/admin/dashboardProduct");
    }
  }
}