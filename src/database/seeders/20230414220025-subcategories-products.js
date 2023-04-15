"use strict";
const subcategoriesArr = [
  {
    id: 1,
    name: "Juegos",
  },
  {
    id: 2,
    name: "Periféricos",
  },
  {
    id: 3,
    name: "Gifts Cards",
  },
  {
    id: 4,
    name: "Consolas",
  },
  {
    id: 5,
    name: "Notebooks",
  },
  {
    id: 6,
    name: "Accesorios",
  },
];

const products = require("../../data/productDataBase.json");
const subcategoryProduct = products.map(({ subcategories }, index) => {
  return {
    productId: index + 1,
    subcategoryId: subcategoriesArr.find(({ name }) => name === subcategories).id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "SubcategoriesProducts",
      subcategoryProduct,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SubcategoriesProducts", null, {});
  },
};
