'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.belongsTo(models.Address, {
        foreignKey : 'addressId',
        as : 'address'
      });
      Usuario.belongsTo(models.Rol, {
        foreignKey : 'rolId',
        as : 'rol'
      });
      Usuario.hasMany(models.Order,{
        foreignKey: "userId",
        as:'orders',
        onDelete : 'cascade'
       });
       Usuario.belongsToMany(models.Product,{
        foreignKey: "userId",
        otherKey: "productId",
        through: "Favorite",
        as: "productsFavorites"
       });
    }
  }
  Usuario.init({
    firstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userName: DataTypes.STRING,
    image: DataTypes.STRING,
    socialId: DataTypes.STRING,
    socialprovider: DataTypes.STRING,
    rolId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return Usuario;
};