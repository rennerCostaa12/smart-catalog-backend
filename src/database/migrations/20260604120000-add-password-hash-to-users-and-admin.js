"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("admin", "password_hash", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addIndex("users", ["email"], {
      unique: true,
      name: "users_email_unique",
    });

    await queryInterface.addIndex("admin", ["email"], {
      unique: true,
      name: "admin_email_unique",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("admin", "admin_email_unique");
    await queryInterface.removeIndex("users", "users_email_unique");
    await queryInterface.removeColumn("admin", "password_hash");
  },
};
