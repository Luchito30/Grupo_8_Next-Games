"use strict";
const { Model } = require("sequelize");
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.State, {
        foreignKey: "stateId",
        as: "state",
      });
      Product.belongsTo(models.Subcategory, {
        foreignKey: "subcategoryId",
        as: "subcategories",
      });
      Product.hasMany(models.Image, {
        foreignKey: "productId",
        as: "images",
        onDelete : 'cascade'
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      visible: DataTypes.BOOLEAN,
      stateId: DataTypes.INTEGER,
      subcategoryId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  sequelizePaginate.paginate(Product)
  return Product;
};
