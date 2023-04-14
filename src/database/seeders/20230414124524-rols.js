'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rols', [{
        rol: "admin",
        createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
        rol: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ], 
      {}
      );
   },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Rols', null, {});
    
  }
};
