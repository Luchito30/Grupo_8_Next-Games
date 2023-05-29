'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Consultation.init({
    name: DataTypes.STRING,
    emails: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    province: DataTypes.STRING,
    municipio: DataTypes.STRING,
    localidad: DataTypes.STRING,
    asunto: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Consultation',
  });
  return Consultation;
};