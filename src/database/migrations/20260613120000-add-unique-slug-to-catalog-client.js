"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("catalog_client", {
      fields: ["slug"],
      type: "unique",
      name: "catalog_client_slug_unique",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      "catalog_client",
      "catalog_client_slug_unique",
    );
  },
};
