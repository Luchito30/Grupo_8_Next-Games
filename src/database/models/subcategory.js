"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subcategory.belongsToMany(models.Product, {
        foreignKey: "subcategoryId",
        otherKey: "productId",
        as: "products",
        through: "SubcategoriesProducts",
      });
    }
  }
  Subcategory.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Subcategory",
    }
  );
  return Subcategory;
};
