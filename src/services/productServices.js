const db = require('../database/models');
const { literalQueryUrlImage, literalQueryUrl } = require('../helpers')

module.exports = {
  getAllProducts: async (req) => {
    try {
      const { count, rows: products } = await db.Product.findAndCountAll({
        include : [
          {
              association : "images",
              attributes : {
                  exclude : ["createdAt","updatedAt","id","productId","name"],
                  include : [
                      literalQueryUrlImage(req,'products','name','urlImage'),
                  ]
              }
          }
      ],
      attributes : {
          include : [
              literalQueryUrl(req,'products','Product.id')
          ]
      }
  });
      return {
        count,
        products,
      };
    } catch (error) {
      console.log(error);
      throw {
        status: 500,
        message: error.message,
      };
    }
  },
  getProductById: async (req, id) => {
    try {

      const product = await db.Product.findByPk(id, {
        include: [
          {
            association: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "productId", "image"],
              include: [
                literalQueryUrlImage(req, 'products', 'images.image', 'urlImage')
              ]
            }
          },
          {
            association: "subcategories",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "active"],
              include: [
                literalQueryUrlImage(req, 'subcategories', 'active', 'urlActive')
              ]
            }
          }
        ]
      })
      return product

    } catch (error) {
      console.log(error)
      throw {
        status: 500,
        message: error.message
      }
    }
  },
  getCreateProduct: async (body) => {
    try {
      const {
        name,
        price,
        description,
        discount,
        state,
        subcategory,
        image
      } = body;

      if (!name || !price || !state || !subcategory) {
        throw {
          status: 400,
          message: "Falta información requerida para crear el producto."
        };
      }
  
      const stateExists = await db.State.findByPk(state);
      const subcategoryExists = await db.Subcategory.findByPk(subcategory);
      if (!stateExists || !subcategoryExists) {
        throw {
          status: 404,
          message: "Estado o subcategoría no encontrada."
        };
      }
  
      const createdProduct = await db.sequelize.transaction(async (transaction) => {
        const newProduct = await db.Product.create({
          name: name.trim(),
          price,
          discount,
          description: description.trim(),
          stateId: state,
          subcategoryId: subcategory,
          image
        }, { transaction });
  
        return newProduct;
      });
  
      return createdProduct;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error al crear el producto."
      };
    }
  },
   getImagesCreate : async (file,id) => {
    try{
      const images = files.forEach(async(image) => {
        await db.Image.create({
          image: image.filename,
          productId:id
        });
      });
      return images
    } catch(error) {
    throw{
      status: 500,
      message: error.message,
    }
    }
   },
   getUpdate: async (id) => {
    try {
      const product = await db.Product.findByPk(id, {
        include: [
          {
            association: "state",
            attributes: ["name"],
          },
          {
            association: "subcategories",
            attributes: ["name"],
          },
          {
            association: "images",
            attributes: ["image"],
          },
        ],
      });
      return product;
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  },
  getUpdateProduct: async (body, id) => {
    try {
      const {
        name,
        price,
        description,
        discount,
        state,
        subcategory,
        image,
      } = body;
  
      const editProduct = await db.Product.update(
        {
          name: name.trim(),
          price,
          discount,
          description: description.trim(),
          stateId: state,
          subcategoryId: subcategory,
          image,
        },
        {
          where: {
            id: id,
          },
        }
      );

      await db.Subcategory.update(
        {
          subcategoryId: subcategory,
        },
        {
          where: {
            productId: id,
          },
        }
      );
  
      await db.State.update(
        {
          stateId: state,
        },
        {
          where: {
            productId: id,
          },
        }
      );
  
      return editProduct;
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  },
  
  getUpdateImage: async (files, id) => {
    try {
      const editImages = files.forEach(async (image) => {
        await db.Image.update(
          {
            name: image.filaname,
          },
          {
            where: {
              productId: id,
            },
          }
        );
        (files &&
          fs.existsSync(`public/images/products/${image.filename}`)) &&
          fs.unlinkSync(`public/images/products/${image.filename}`);
      });
      return editImages;
    } catch (error) {
      throw {
        status: 500,
        message: error.message,
      };
    }
  },
}