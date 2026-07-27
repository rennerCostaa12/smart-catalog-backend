"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("payments", "asaas_payment_id", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addIndex("payments", ["asaas_payment_id"], {
      name: "payments_asaas_payment_id_unique",
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex(
      "payments",
      "payments_asaas_payment_id_unique",
    );
    await queryInterface.removeColumn("payments", "asaas_payment_id");
  },
};
