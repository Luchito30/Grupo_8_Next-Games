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
  
      // Validación de datos
      if (!name || !price || !state || !subcategory) {
        throw {
          status: 400,
          message: "Falta información requerida para crear el producto."
        };
      }
  
      // Verificar existencia de estado y subcategoría en la base de datos
      const stateExists = await db.State.findByPk(state);
      const subcategoryExists = await db.Subcategory.findByPk(subcategory);
      if (!stateExists || !subcategoryExists) {
        throw {
          status: 404,
          message: "Estado o subcategoría no encontrada."
        };
      }
  
      // Uso de transacción para asegurar la integridad de los datos
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
}