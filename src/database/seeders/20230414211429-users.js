'use strict';

/** @type {import('sequelize-cli').Migration} */
const userJSON = require('../../data/user.json');
const users = userJSON.map(user=>{
  return{
    ...user,
    createdAt : new Date(),
    updatedAt : new Date(), 
  }
})
const bcryptjs = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      users,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
