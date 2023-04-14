'use strict';

const productsJSON = require('../../data/productDataBase.json')
let images_db = [];
productsJSON.forEach(({id,images}) => {
  images_db = [...images_db,...images.map(image => {
    return {
      image : image,
      productId: id,
      createdAt : new Date(),
      updatedAt : new Date()
    }
  })]
});
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Images', images_db, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Images', null, {});

  }
};