'use strict';
const productsJSON = require('../../data/productDataBase.json')
const products = productsJSON.map(({name, price, description, discount, image}) => {
  return {
    name : name.trim(),
    price,
    description,
    discount,
    image,
    CategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Products', products, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Products', null, {});

  }
};