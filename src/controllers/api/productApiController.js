const createResponseError = require("../../helpers/createResponseError")
const { getAllProducts, getProductById,getCreateProduct,getImagesCreate,getUpdate,getUpdateImage,getUpdateProduct,getDelete,getDeleteProduct,getProductsBySubcategory,getProductsByState } = require('../../services/productServices');
const { validationResult } = require("express-validator");

module.exports = {
  index: async (req, res) => {
    try {
      const { withPagination = "true", page = 1, limit = 6 } = req.query;
      const { count, products, pages } = await getAllProducts(req, {
        withPagination,
        page,
        limit: +limit,
      });
      let data = {
        count,
        products,
      };
      if (withPagination === "true") {
        data = {
          ...data,
          pages,
          currentPage: +page,
        };
      }

      return res.status(200).json({
        ok: true,
        data,
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
          message: "Producto no encontrado",
        };
      }
      return res.status(200).json({
        ok: true,
        product,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        error: {
          status: error.status || 500,
          message: error.message || "Upss, hubo un error",
        },
      });
    }
  },
  storeProduct: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        throw {
          status: 400,
          message: errors.mapped(),
        };

      const productNew = await getCreateProduct(req.body);
      const imagesNew = await getImagesCreate(req.files, productNew.id);

      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
          total: 1,
          url: `/api/products/${productNew.id}`,
        },
        data: {
          productNew: productNew,
          images: imagesNew,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  editProduct: async (req, res) => {
    try {
      const product = await getUpdate(req.params.id);
      return res.status(200).json({
        ok: true,
        data: product,
        meta: {
          status: 200,
          total: 1,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const errors = validationResult(req);
      const { id } = req.params;
      console.log(id);

      if (!errors.isEmpty())
        throw {
          status: 400,
          message: errors.mapped(),
        };

      const productUpdate = await getUpdateProduct(req.body, id);
      const updateImage = await getUpdateImage(req.body, id);

      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
          total: 1,
          url: `/api/products/${id}`,
        },
        data: {
          productUpdate: productUpdate,
          images: updateImage,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await getDelete(req.params.id);
      return res.status(200).json({
        ok: true,
        data: product,
        meta: {
          status: 200,
          total: 1,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  deleteAllProduct: async (req, res) => {
    try {
      const errors = validationResult(req);
      const { id } = req.params;
      console.log(id);

      if (!errors.isEmpty()) {
        throw {
          status: 400,
          message: errors.mapped(),
        };
      }

      const productDelete = await getDeleteProduct(id);

      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
          total: 1,
          url: `/api/products/${id}`,
        },
        data: {
          productDelete: productDelete,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  subcategories: async (req, res) => {
    try {
      const { subcategoryId } = req.params;
      const { withPagination = "true", page = 1, limit = 6 } = req.query;

      const { count, products, pages } = await getProductsBySubcategory(
        subcategoryId,
        {
          withPagination,
          page,
          limit: +limit,
        }
      );
      let data = {
        count,
        products,
        subcategoryId,
      };

      if (withPagination === "true") {
        data = {
          ...data,
          pages,
          currentPage: +page,
        };
      }

      return res.status(200).json({
        ok: true,
        data,
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
  states: async (req, res) => {
    try {
      const { stateId } = req.params;
      const { withPagination = "true", page = 1, limit = 6 } = req.query;

      const { count, products, pages } = await getProductsByState(
        stateId,
        {
          withPagination,
          page,
          limit: +limit,
        }
      );
      let data = {
        count,
        products,
        stateId,
      };

      if (withPagination === "true") {
        data = {
          ...data,
          pages,
          currentPage: +page,
        };
      }

      return res.status(200).json({
        ok: true,
        data,
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
};

