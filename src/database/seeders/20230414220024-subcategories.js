'use strict';

const subCategoriesJSON = ['Juegos', 'Periféricos', 'Gifts Cards', 'Consolas', 'Notebooks', 'Accesorios']
const subCategories = subCategoriesJSON.map(subCategory => {
  return {
    name: subCategory,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subCategories', subCategories, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subCategories', null, {});

  }
};
