'use strict';

/** @type {import('sequelize-cli').Migration} */
const newsletterJSON =  require("../../data/newsletter.json");
const newsletters =  newsletterJSON.map(newsletter => {
  return{
    ...newsletter,
    createdAt : new Date(),
    updatedAt : new Date(),
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "NewsLatters",
      newsletters,
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("NewsLatters", null, {});
  }
};
