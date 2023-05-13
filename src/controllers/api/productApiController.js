const createResponseError = require("../../helpers/createResponseError")
const { getAllProducts, getProductById,getCreateProduct,getImagesCreate } = require('../../services/productServices');
const { validationResult } = require("express-validator");

module.exports = {
  index: async (req, res) => {
    try {
      const { count, products } = await getAllProducts(req);

      return res.status(200).json({
        ok: true,
        url: "/api/products",
        count: products.length,
        products,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        error: {
          status: error.status || 500,
          message: error.message || "Ups, hubo un error",
        },
      });
    }
  },
  detail: async (req, res) => {
    try {

      const product = await getProductById(req, req.params.id);

      if (!product) {
        throw {
          status: 404,
          message: 'Producto no encontrado'
        }
      }
      return res.status(200).json({
        ok: true,
        product
      })
    } catch (error) {
      console.log(error)
      return res.status(error.status || 500).json({
        ok: false,
        error: {
          status: error.status || 500,
          message: error.message || "Upss, hubo un error"
        }
      })
    }
  },
  storeProduct: async (req, res) => {
    try {
    const errors = validationResult(req);

    if(!errors.isEmpty()) throw {
      status : 400,
      message : errors.mapped()
    }

    const productNew = await getCreateProduct(req.body)
    const imagesNew = await getImagesCreate(req.files,productNew.id)

    return res.status(200).json({
      ok : true,
      meta : {
        status : 200,
        total : 1,
        url : `/api/products/${productNew.id}`
      },
      data : {
        productNew : productNew,
        images : imagesNew
      }
    })

    } catch (error) {
      return createResponseError(res,error)
    }
  },


};

