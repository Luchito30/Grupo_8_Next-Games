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
  }
}