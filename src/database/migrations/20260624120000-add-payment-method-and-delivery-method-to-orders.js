"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "method_payment_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "method_payments",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("orders", "delivery_method", {
      type: Sequelize.ENUM("RETIRADA", "ENTREGA"),
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("orders", "delivery_method");
    await queryInterface.removeColumn("orders", "method_payment_id");
  },
};
