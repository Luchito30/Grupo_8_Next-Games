"use strict";

const statesSeed = [
  { name: "normally", image: "" },
  { name: "newer", image: "p-nuevo.png" },
  { name: "in-sale", image: "p-oferta.png" },
];
const states = statesSeed.map(({ name, image }, index) => {
  const isActive = index !== 0;
  return {
    name,
    active: isActive,
    image,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("States", states, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("States", null, {});
  },
};
