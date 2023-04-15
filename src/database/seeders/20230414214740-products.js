"use strict";
const productsJSON = require("../../data/productDataBase.json");
const states = [
  { id: 1, name: "normally" },
  { id: 2, name: "newer" },
  { id: 3, name: "in-sale" },
];
const products = productsJSON.map(
  ({ name, price, description, discount, image, state }) => {
    return {
      name: name.trim(),
      price,
      description,
      discount,
      image,
      stateId: states.find((s) => s.name === state).id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
);
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
