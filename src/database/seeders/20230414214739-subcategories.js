'use strict';

const subCategoriesseed = [
  {name :'Juegos'}, 
  {name:'Periféricos'}, 
  {name: 'Gifts Cards'}, 
  {name:'Consolas'}, 
  {name:'Notebooks'}, 
  {name:'Accesorios'}
]
const subCategories = subCategoriesseed.map(({name},index) => {
  const isActive = index !== 0;
  return {
    name,
    active: isActive,
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
